import styled from 'styled-components'

import { BLACK, WHITE, YELLOW } from 'src/styles/colors.js'

export const H1 = styled.h1`
  color: ${WHITE};
  font-size: 72px;
  line-height: 88px;
  text-align: center;
`

export const H2 = styled.h2`
  color: ${WHITE};
  font-size: 36px;
  line-height: 40px;
  text-align: center;
`

export const H3 = styled.h3`
  color: ${WHITE};
  font-size: 24px;
  line-height: 32px;
`

export const H4 = styled.h4`
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
  font-size: 16px;
  line-height: 24px;
`

export const Container = styled.div`
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
`
