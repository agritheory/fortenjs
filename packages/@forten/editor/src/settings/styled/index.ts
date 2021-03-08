import { StyledSettings } from '@forten/styled'
import { editor_dragBar, editor_titleExtra } from '../../types'
import { icons } from './icons'

export const styled: StyledSettings['styled'] = {
  family: {
    // Setup empty folder
    [editor_titleExtra]: {},
    // Setup empty folder
    [editor_dragBar]: {},
  },
  icons,
}
