import styled from 'styled-components'

import { BLACK, GRAY, SILVER, WHITE, YELLOW } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

export const A = styled.a`
  border-bottom: 1px dotted ${GRAY};
  color: ${SILVER};
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    border-bottom-color: ${SILVER};
    color: ${WHITE};
  }
`

export const H1 = styled.h1`
  margin: 0;
  color: ${WHITE};
  font-size: 72px;
  line-height: 88px;
  text-align: center;
`

export const H2 = styled.h2`
  margin: 56px 0 56px;
  color: ${WHITE};
  font-size: 36px;
  line-height: 40px;
  text-align: center;
`

export const H3 = styled.h3`
  margin-bottom: 0;
  color: ${WHITE};
  font-size: 24px;
  line-height: 32px;
`

export const H4 = styled.h4`
  margin-bottom: 0;
  color: ${WHITE};
  font-size: 20px;
  line-height: 32px;
`

export const H5 = styled.h5`
  color: ${YELLOW};
  font-size: 14px;
  letter-spacing: ${1 / 14}em;
  line-height: 24px;
  text-transform: uppercase;
`

export const P = styled.p`
  margin: 16px 0;
  font-size: 16px;
  line-height: 24px;
`

export const TextInput = styled.input`
  appearance: none;
  padding: 8px 16px;
  background-color: ${BLACK};
  border: none;
  border-radius: 2px;
  color: ${WHITE};
  font-family: ${FONT_NORMAL};
  font-size: 16px;
  line-height: 24px;
`
