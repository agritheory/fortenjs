import { resolve } from '@forten/build'
import { DragdropHooks } from '@forten/dragdrop'
import { makeId } from '@forten/tree'
import { Context } from '../../../app.js'
import { TreeDrag } from '../../../types/index.js'

export const release: DragdropHooks['release'] = (ctx: Context) => {
  const { actions, state } = ctx
  const { drag, drop } = state.dragdrop
  if (!drag) {
    return
  }

  const { origin, tree } = drag.payload as TreeDrag
  actions.treeView.clearUimap({ tree })

  if (!drop) {
    // cleanup only needed if drop is not triggered
    // clear cached uimap
    const originTree = resolve(ctx, origin)
    if (originTree && originTree.lock) {
      delete originTree.lock
      originTree.version = makeId({ [originTree.version]: '' })
      actions.tree.changed({ tree: originTree })
      actions.treeView.uimap({ tree: originTree })
    }
  }
}
