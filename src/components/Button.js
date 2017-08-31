import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { values } from 'lodash'
import { compose, defaultProps, setPropTypes } from 'recompose'
import { color, lightness } from 'kewler'

import { BLUE, GRAY, SILVER, WHITE } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

export const ButtonStyle = {
  FRIENDLY: 'FRIENDLY',
  ALLURING: 'ALLURING',
}

const pulsate = keyframes`
  50% {
    opacity: 0.8;
  }
`

const StyledButton = styled.button.attrs({
  backgroundColor: props =>
    props.buttonStyle === ButtonStyle.ALLURING ? BLUE : SILVER,
  textColor: props =>
    props.buttonStyle === ButtonStyle.ALLURING ? WHITE : BLUE,
})`
  display: inline-block;
  max-width: 440px;
  padding: 8px 32px;
  background: ${props => props.backgroundColor};
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  color: ${props => props.textColor};
  font-family: ${FONT_NORMAL};
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    background-color: ${props => color(props.backgroundColor)(lightness(5))()};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  &:active {
    background-color: ${props =>
      color(props.backgroundColor)(lightness(-10))()};
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }

  ${props =>
    props.isEnabled === false
      ? `
    background-color: ${GRAY};
    color: ${WHITE};
    pointer-events: none;
  `
      : ``};

  ${props =>
    props.isLoading === true &&
    `
    background-color: ${color(props.backgroundColor)(lightness(-10))()};
    color: ${props.textColor};
    pointer-events: none;
    animation: ${pulsate} 1.5s ease-in-out infinite;
    `}
`

const createStyledButton = compose(
  setPropTypes({
    buttonStyle: PropTypes.oneOf(values(ButtonStyle)),
    isEnabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }),
  defaultProps({
    buttonStyle: ButtonStyle.ALLURING,
    isEnabled: true,
    isLoading: false,
    onClick: () => {},
    className: '',
  })
)

/**
 * Button with component <button>
 */
export const Button = createStyledButton(
  StyledButton.withComponent(({ onClick, disabled, className, children }) =>
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
)

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
