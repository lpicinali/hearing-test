import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { values } from 'lodash'
import { compose, defaultProps, setPropTypes } from 'recompose'

import { BLUE, GRAY, SILVER, WHITE } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

export const ButtonStyle = {
  FRIENDLY: 'FRIENDLY',
  ALLURING: 'ALLURING',
}

const StyledButton = styled.button`
  display: inline-block;
  max-width: 440px;
  padding: 8px 32px;
  background: ${props =>
    props.buttonStyle === ButtonStyle.ALLURING ? BLUE : SILVER};
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  color: ${props =>
    props.buttonStyle === ButtonStyle.ALLURING ? WHITE : BLUE};
  font-family: ${FONT_NORMAL};
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;

  ${props =>
    props.isEnabled === false
      ? `
    background-color: ${GRAY};
    color: ${WHITE};
    pointer-events: none;
  `
      : ``};
`

const createStyledButton = compose(
  setPropTypes({
    buttonStyle: PropTypes.oneOf(values(ButtonStyle)),
    isEnabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }),
  defaultProps({
    buttonStyle: ButtonStyle.ALLURING,
    isEnabled: true,
    onClick: () => {},
    className: '',
  })
)

/**
 * Button with component <button>
 */
export const Button = createStyledButton(StyledButton)

export default Button

/**
 * Button with component <Link>
 */
export const LinkButton = createStyledButton(
  StyledButton.withComponent(({ to, className, children }) =>
    <Link to={to} className={className}>
      {children}
    </Link>
  )
)
