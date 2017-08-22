import React, { Component, PropTypes } from 'react'
import { identity } from 'lodash'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

import { BLUE, WHITE } from 'src/styles/colors.js'

const StyledCheckbox = styled.span`
  display: flex;
  opacity: ${props => (props.isEnabled ? 1 : 0.4)};
`

const StyledCheckmark = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${BLUE};
  border-radius: 3px;
  transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

  svg {
    position: relative;
  }

  path {
    stroke: ${WHITE};
    stroke-width: 2px;
    stroke-dasharray: 20px 20px;
    stroke-dashoffset: 20px;
    fill: transparent;
    transition: stroke-dashoffset 0.2s ease-in-out 0.2s;
  }

  ${props =>
    props.isEnabled &&
    `
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 3px ${BLUE};
    }

    &:active {
      box-shadow: 0 0 0 0px ${BLUE};
    }
`} ${props =>
      props.isChecked &&
      `
    background-color: ${BLUE};

    path {
      stroke-dashoffset: 0;
    }
    `};
`

const StyledCheckboxLabel = styled.span`
  padding-left: 16px;
  cursor: ${props =>
    props.isEnabled && props.isTextClickable ? 'pointer' : 'default'};
`

/**
 * Checkbox
 */
class Checkbox extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool,
    isChecked: PropTypes.bool.isRequired,
    isTextClickable: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    isEnabled: true,
    isTextClickable: true,
    onChange: identity,
    className: '',
    children: null,
  }

  @autobind
  handleClick() {
    const { isEnabled, isChecked, onChange } = this.props

    if (isEnabled) {
      onChange(!isChecked)
    }
  }

  render() {
    const {
      isEnabled,
      isChecked,
      isTextClickable,
      className,
      children,
      ...props
    } = this.props

    // Don't add onChange this to the <span> tag, it causes Proxy events to bubble up
    delete props.onChange

    return (
      <StyledCheckbox isEnabled={isEnabled} {...props}>
        <StyledCheckmark
          isEnabled={isEnabled}
          isChecked={isChecked}
          onClick={this.handleClick}
        >
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5.92704311 L4.0379307,9 C4.0379307,9 12,1.02483534 12,1" />
          </svg>
        </StyledCheckmark>

        {children &&
          <StyledCheckboxLabel
            onClick={isTextClickable ? this.handleClick : identity}
          >
            {children}
          </StyledCheckboxLabel>}
      </StyledCheckbox>
    )
  }
}

export default Checkbox
