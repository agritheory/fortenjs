import { Action } from '../app.js'
import { caretSelection, CompositionHolder } from '../lib/index.js'
import { getAtPath } from '../lib/utils/getAtPath.js'
import { lastId } from '../lib/utils/lastId.js'
import { newParagraph } from '../lib/utils/newParagraph.js'
import {
  ElementOptionsType,
  OperationsKey,
  ParagraphPayload,
} from '../lib/utils/types.js'

export interface CreateCustomParagraphArg {
  holder: CompositionHolder
  type: string
  data?: any
  o?: ElementOptionsType
  // Replace currently selected paragraph (default is false)
  replace?: boolean
  afterId?: string | null
}

export const createCustomParagraph: Action<CreateCustomParagraphArg> = (
  ctx,
  arg
) => {
  const { holder, type, data, afterId, replace, o } = arg
  const composition = ctx.effects.editor.ensureComposition(holder)

  let anchor =
    afterId ||
    (composition.spath ? composition.spath.split('.')[0] : undefined) ||
    lastId(composition.g)

  if (!anchor) {
    return
  }

  if (!replace) {
    // Insert a blank paragraph first
    const parentPath = [anchor]
    const parent = getAtPath(composition, parentPath)
    if (!parent) {
      return
    }
    // Create new paragraph
    const { path, elem } = newParagraph(composition, {
      path: [anchor],
      elem: parent,
    })
    composition.g[path[0]] = elem
    anchor = path[0]
  }

  if (!anchor) {
    // No idea where to insert the new custom paragraph
    return
  }

  const selection = caretSelection([anchor], 0)
  const op: OperationsKey = 'P'
  const opts: ParagraphPayload = {
    c: type,
    data,
  }
  if (o) {
    opts.o = o
  }
  ctx.actions.editor.applyOp({ holder, op, selection, opts })
}
