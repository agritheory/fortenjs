import { Setup } from '@forten/build'
import { EditorOptions } from './lib'
import * as defaultParagraphs from './paragraphs'
import { parseOptions } from './parseOptions'
import { EditorConfig, EditorSettings } from './types'

type Keys = keyof EditorOptions

export const setup: Setup<EditorConfig, EditorSettings> = (
  config,
  blockSettings
) => {
  const settings: EditorOptions = { paragraphs: {}, paste: {} }
  Object.keys(blockSettings).forEach(blockName => {
    const opts = blockSettings[blockName]
    const keys = Object.keys(opts) as Keys[]
    keys.forEach(key => {
      if (key === 'paragraphs') {
        // merge
        settings[key] = Object.assign(settings[key] || {}, opts[key])
      } else if (key === 'paste') {
        // merge
        settings[key] = Object.assign(settings[key] || {}, opts[key])
      } else {
        settings[key] = opts[key]
      }
    })
  })

  if (!settings.noDefaults) {
    settings.paragraphs = Object.assign(
      {},
      defaultParagraphs,
      settings.paragraphs
    )
  }

  const opts = Object.assign({}, parseOptions(settings))
  config.state.editor.options = () => opts
}
