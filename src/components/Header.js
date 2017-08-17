import React from 'react'
import { T } from 'lioness'
import styled from 'styled-components'

import LocalePicker from 'src/containers/LocalePicker.js'
import { WHITE } from 'src/styles/colors.js'
import { Col, Container, Row } from 'src/styles/grid.js'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
`

const Logo = Col.extend`vertical-align: middle;`
const LogoImage = styled.img`vertical-align: middle;`
const LogoText = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-left: 16px;
  color: ${WHITE};
  font-size: 12px;
`

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Row>
          <Logo grow>
            <LogoImage src="/img/3d-tune-in-logo-white.svg" alt="" />
            <LogoText>
              <T>3D Tune-In Hearing Test</T>
            </LogoText>
          </Logo>

          <Col>
            <LocalePicker />
          </Col>
        </Row>
      </Container>
    </StyledHeader>
  )
}
