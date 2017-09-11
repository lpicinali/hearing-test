import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { WHITE } from 'src/styles/colors.js'

const BaseSvg = ({ color, className, children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
)

BaseSvg.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

/**
 * Icon
 */
class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    color: WHITE,
    className: '',
  }

  render() {
    const { name, color, className } = this.props

    let path = null
    if (name === 'thumbs-up') {
      path = (
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      )
    } else if (name === 'thumbs-down') {
      path = (
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
      )
    }

    return (
      <BaseSvg color={color} className={className}>
        {path}
      </BaseSvg>
    )
  }
}

export default Icon
