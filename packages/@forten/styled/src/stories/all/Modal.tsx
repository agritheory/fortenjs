import { ComponentWrapper } from '@forten/story'
import { mutate } from 'overmind'
import * as React from 'react'
import { Comp } from '../../app.js'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Horizontal,
  Modal as component,
  ModalProps as Props,
  Spacer,
  TitleText,
} from '../../index.js'
import { config, Stories, useOvermind } from '../helpers.js'

const Wrapper: Comp = ({ children }) => {
  const app = useOvermind()
  if (app.state.test.open) {
    return <ComponentWrapper>{children}</ComponentWrapper>
  }
  return null
}

export const modalStories: Stories<Props> = {
  component,
  config,
  wrapper: Wrapper,
  props: app => ({
    onClick: app.actions.test.toggleOpen,
  }),
  name: 'Modal (click to view)',
  titleClick: mutate(({ state }) => {
    state.test.open = !state.test.open
  }),
  stories: [
    {
      name: 'simple',
      children() {
        const app = useOvermind()
        return <Button onClick={app.actions.test.toggleOpen} text="Close" />
      },
    },

    {
      name: 'Modal with Card',
      children() {
        const app = useOvermind()
        return (
          <Card>
            <CardTitle titleKey="LoginTitle" key="t" />
            <CardContent>
              <TitleText>Something</TitleText>
            </CardContent>
            <CardFooter>
              <Horizontal>
                <Spacer />
                <Button onClick={app.actions.test.toggleOpen} text="Close" />
              </Horizontal>
            </CardFooter>
          </Card>
        )
      },
    },
  ],
}
