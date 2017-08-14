import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { BLUE, GRAY, WHITE } from 'src/styles/colors.js'

const StyledButton = styled.button`
  appearance: none;
  display: inline-block;
  max-width: 440px;
  padding: 8px 16px;
  background: ${BLUE};
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  color: ${WHITE};
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
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
