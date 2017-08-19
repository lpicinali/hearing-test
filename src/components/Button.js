import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { values } from 'lodash'
import { withProps } from 'recompose'

import { BLUE, GRAY, SILVER, WHITE } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

export const ButtonStyle = {
  FRIENDLY: 'FRIENDLY',
  ALLURING: 'ALLURING',
}

/**
 * Button
 */
class Button extends PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    buttonStyle: PropTypes.oneOf(values(ButtonStyle)),
    isEnabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    component: 'button',
    buttonStyle: ButtonStyle.ALLURING,
    isEnabled: true,
    isActive: false,
    onClick: () => {},
    className: '',
  }

  render() {
    const {
      component,
      buttonStyle,
      isEnabled,
      isActive,
      onClick,
      children,
      className,
      ...props
    } = this.props

    return React.createElement(
      component,
      {
        ...props,
        buttonStyle,
        disabled: isEnabled === false,
        className,
        onClick,
        isActive,
      },
      children
    )
  }
}

const StyledButton = styled(Button)`
  appearance: none;
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
    props.disabled
      ? `
    background-color: ${GRAY};
    color: ${WHITE};
    pointer-events: none;
  `
      : ``};
`

export default StyledButton

export const LinkButton = withProps({ component: Link })(StyledButton)
