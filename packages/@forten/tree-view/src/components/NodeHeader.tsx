import { TreeType } from '@forten/tree-type'
import * as React from 'react'
import { Comp, styled, useOvermind } from '../app'
import { BlockName } from './BlockName'

export interface NodeHeaderProps {
  className?: string
  tree: TreeType
  blockId: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  border-radius: 2px;
  background: #ffffff14;
`

export const NodeHeader: Comp<NodeHeaderProps> = ({
  className,
  tree,
  blockId,
}) => {
  useOvermind()
  return (
    <Wrapper className={className}>
      <BlockName tree={tree} blockId={blockId} />
    </Wrapper>
  )
}
