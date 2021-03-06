import { Action } from '../app.js'
import { getTitleElem } from '../lib/getTitle.js'
import { CompositionHolder } from '../lib/utils/types.js'

export interface TitleChangeArgs {
  holder: CompositionHolder
  value: string
}

export const titleChange: Action<TitleChangeArgs> = (ctx, arg) => {
  const { editor } = ctx.effects
  const { holder, value } = arg
  editor.ensureComposition(holder)
  editor.clearToolbox(holder)
  const { composition } = holder
  const elem = getTitleElem(composition!)
  if (elem) {
    elem.i = value
    editor.clearSelection(holder)
    ctx.actions.editor.changed(holder)
  }
}
