import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { BLUE, GRAY, WHITE } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

const StyledButton = styled.button`
  appearance: none;
  display: inline-block;
  max-width: 440px;
  padding: 8px 32px;
  background: ${BLUE};
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  outline: none;
  cursor: pointer;
  color: ${WHITE};
  font-family: ${FONT_NORMAL};
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    box-shadow: 0 0 0 3px ${GRAY};
  }

  ${props =>
    props.isActive
      ? `
    box-shadow: 0 0 0 3px ${GRAY};
  `
      : ``} ${props =>
      props.disabled
        ? `
    background-color: ${GRAY};
    color: ${WHITE};
    pointer-events: none;
  `
        : ``};
`

/**
 * Button
 */
class Button extends PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    isEnabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    component: 'button',
    isEnabled: true,
    isActive: false,
    onClick: () => {},
    className: '',
  }

  render() {
    const {
      isEnabled,
      isActive,
      onClick,
      children,
      className,
      ...props
    } = this.props

    return (
      <StyledButton
        disabled={isEnabled === false}
        className={className}
        onClick={onClick}
        isActive={isActive}
        {...props}
      >
        {children}
      </StyledButton>
    )
  }
}

export default Button

export const LinkButton = StyledButton.withComponent(Link)
