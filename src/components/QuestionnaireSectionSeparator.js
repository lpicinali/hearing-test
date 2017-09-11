import React from 'react'
import styled from 'styled-components'

import Icon from 'src/components/Icon.js'
import { WHITE } from 'src/styles/colors.js'

const SectionSeparatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1px;
  margin: 63px 0 64px;
  opacity: 0.2;
`

const SectionSeparatorLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background: ${WHITE};

  &:first-child {
    margin-right: 24px;
  }

  &:last-child {
    margin-left: 24px;
  }
`

const SectionSeparatorIcon = styled(Icon)`
  display: inline-block;
  margin: 0 12px;
`

export default () => (
  <SectionSeparatorWrapper>
    <SectionSeparatorLine />
    <SectionSeparatorIcon name="thumbs-down" />
    <SectionSeparatorIcon name="thumbs-up" />
    <SectionSeparatorLine />
  </SectionSeparatorWrapper>
)
