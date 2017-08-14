import React from 'react'
import { T } from 'lioness'
import styled from 'styled-components'

import LocalePicker from 'src/containers/LocalePicker.js'
import { WHITE } from 'src/styles/colors';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: ${WHITE};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
`

const StyledTitle = styled.div`
  margin-right: 24px;
`

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
