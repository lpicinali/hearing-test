import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

/**
 * Fade Transition
 */
class FadeTransition extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return <Motion>{Children.toArray(children)}</Motion>
  }
}

export default FadeTransition
