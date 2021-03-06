import { Reference, resolve } from '@forten/build'
import { DragdropHooks, Position } from '@forten/dragdrop'
import { TreeType } from '@forten/tree-type'
import { Context } from '../../../app.js'
import { defaultUILayout } from '../../../helpers/index.js'
import { SlotInfo, TreeDrag, TreeDrop } from '../../../types/index.js'

const MIN_TREE_DIST = 2 * 50 * 50 // px

interface BranchPosition {
  tree: Reference<TreeType>
  id: string
  x: number
  y: number
  width: number
  height: number
  slots: SlotInfo[]
}

interface PositionWithSize extends Position {
  width?: number
  height?: number
}

function findClosest<T extends PositionWithSize>(
  elements: T[],
  position: Position,
  minDistance: number = Infinity,
  useSize: boolean = false
): T | undefined {
  const { x, y } = position
  // Find closest slot.
  let d = minDistance
  let target: T | undefined = undefined
  for (const e of elements) {
    let dx = x - e.x
    let dy = y - e.y
    if (useSize) {
      const width = e.width || 0
      const height = e.height || 0
      if (dx > 0) {
        // inside or dist to right border
        dx = Math.max(0, dx - width)
      }
      if (dy > 0) {
        // inside or dist to bottom border
        dy = Math.max(0, dy - height)
      }
    }
    const distance = dx * dx + dy * dy
    if (distance < d) {
      d = distance
      target = e
    }
  }
  return target
}

export const move: DragdropHooks['move'] = (ctx: Context, value) => {
  const { state } = ctx
  const { position } = value
  const { drag } = state.dragdrop
  if (!drag) {
    return false
  }
  const anchor = drag.anchor
  const { SLOT, SPAD, RADIUS } = defaultUILayout
  const slotPosition = {
    x: position.x - anchor.x + 0.5 + RADIUS + SPAD + SLOT,
    y: position.y - anchor.y + 0.5,
  }

  const { tree: branch } = drag.payload as TreeDrag
  const trees: BranchPosition[] = Array.from(
    document.getElementsByClassName(`tree-${branch.type}`)
  )
    .map(e => {
      const uigraph = ctx.state.treeView.uimap[e.id]
      if (!uigraph || !uigraph.tree) {
        return undefined
      }
      const rect = e.getBoundingClientRect()
      const g: BranchPosition = {
        tree: uigraph.tree,
        id: e.id,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        slots: uigraph.slots,
      }
      return g
    })
    .filter(e => e) as BranchPosition[]

  // clear other target
  const { dropTarget } = state.treeView
  const oldId = Object.keys(dropTarget)[0]

  // find closest graph on page
  const tree = findClosest(trees, slotPosition, MIN_TREE_DIST, true)
  if (tree) {
    const slot = findClosest(tree.slots, {
      x: slotPosition.x - tree.x,
      y: slotPosition.y - tree.y,
    })
    if (slot) {
      if (oldId === tree.id) {
        const oldSlot = dropTarget[oldId]
        if (
          oldSlot.blockId === slot.blockId &&
          oldSlot.slotIdx === slot.slotIdx
        ) {
          // did not change
          return true
        }
      } else {
        delete dropTarget[oldId]
      }
      dropTarget[tree.id] = JSON.parse(JSON.stringify(slot))
      const payload: TreeDrop = {
        target: tree.tree,
      }
      state.dragdrop.drop = {
        type: 'tree',
        callback: ctx.actions.treeView.drop,
        payload,
      }
      const definition = state.tree.definitions()[branch.type]
      const target = resolve(ctx, tree.tree)
      if (definition && target) {
        ctx.actions.tree.changed({
          tree: target,
          connecting: {
            blockId: slot.blockId,
            slotIdx: slot.slotIdx,
            tree: branch,
          },
        })
      }
      return true
    } else {
      // no drop
      delete state.dragdrop.drop
      delete dropTarget[oldId]
    }
  } else {
    delete state.dragdrop.drop
    delete dropTarget[oldId]
  }
  return false
}
