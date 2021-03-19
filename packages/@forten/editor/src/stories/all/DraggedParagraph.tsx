import { reference } from '@forten/build'
import styled from 'styled-components'
import {
  DraggedParagraph as component,
  DraggedParagraphProps as Props,
} from '../../index.js'
import { config, Stories } from '../helpers.js'

const wrapper = styled.div`
  padding: 8px;
  background: white;
`

export const draggedParagraph: Stories<Props> = {
  name: 'Dragged paragraph',
  component,
  config,
  wrapper,
  stories: [
    {
      name: 'Long text',
      props(ctx) {
        const holder = ctx.state.test.e4
        const ids = Object.keys(holder.composition.g)
        const sourceId = ids[ids.length - 1]
        return {
          sourceRef: reference(holder),
          sourceId,
          sourceCompId: 'foo',
        }
      },
    },

    {
      name: 'Custom',
      props(ctx) {
        return {
          sourceRef: reference(ctx.state.test.e1),
          sourceId: 'bar',
          sourceCompId: 'foo',
        }
      },
    },
  ],
}
