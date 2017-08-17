import React from 'react'
import { T } from 'lioness'
import styled from 'styled-components'

import LocalePicker from 'src/containers/LocalePicker.js'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
`

const StyledTitle = styled.div`margin-right: 24px;`

export default function Header() {
  return (
    <StyledHeader>
      <StyledTitle>
        <T>3D Tune-In Hearing Test</T>
      </StyledTitle>

      <LocalePicker />
    </StyledHeader>
  )
}
