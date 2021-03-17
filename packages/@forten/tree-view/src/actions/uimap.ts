import { reference } from '@forten/build'
import { TreeType } from '@forten/tree-type'
import { Action } from '../app.js'
import { uimap as doMap } from '../helpers/index.js'

export const uimap: Action<{ tree: TreeType }> = (ctx, arg) => {
  const { tree } = arg
  const uigraph = doMap(tree)

  // required for drag & drop to find origin from graph id.
  uigraph.tree = reference(arg.tree)
  ctx.state.treeView.uimap[tree.id] = uigraph
}

export const clearUimap: Action<{ tree: TreeType }> = (ctx, arg) => {
  delete ctx.state.treeView.uimap[arg.tree.id]
}
