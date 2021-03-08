import { Block } from '@forten/build'
import { hooks } from '@forten/hooks'
import * as actions from './actions'
import { setup } from './setup'
import { TreeConfig } from './types'

export * from './helpers'
export { TreeConfig, TreeDefinitions, TreeSettings } from './types'

export const tree: Block<TreeConfig> = {
  name: 'tree',
  dependencies: [hooks],
  setup,
  state: {
    tree: {
      // Dummy. Set with 'setup'
      definitions: () => ({}),
    },
  },
  actions: {
    tree: actions,
  },
}
