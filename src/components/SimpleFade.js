/* global window */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FadingElement = styled.div`
  opacity: ${props => (props.isShown ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${props => props.duration}ms;
`

/**
 * Simple Fade
 */
class SimpleFade extends PureComponent {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    animate: false,
  }

  componentDidMount() {
    const { delay } = this.props

    window.setTimeout(() => {
      this.setState(() => ({
        animate: true,
      }))
    }, delay)
  }

  render() {
    const { duration, children } = this.props
    const { animate } = this.state

    return (
      <FadingElement isShown={animate} duration={duration}>
        {children}
      </FadingElement>
    )
  }
}

export default SimpleFade
