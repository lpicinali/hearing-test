import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { BLACK, GRAY, WHITE } from 'src/styles/colors.js'

const StyledButton = styled.button`
  appearance: none;
  padding: 4px 8px;
  background: ${WHITE};
  border: 1px solid ${GRAY};
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  color: ${BLACK};
  font-size: 16px;
  transition: all 0.15s;

  &:hover {
    box-shadow: 0 0 0 3px ${GRAY};
  }

  ${props =>
    props.isActive
      ? `
    background-color: ${GRAY};
    color: ${WHITE};
  `
      : ``} ${props =>
      props.disabled
        ? `
    border-color: gray;
    color: gray;
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
