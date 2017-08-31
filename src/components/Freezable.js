import { Component } from 'react'
import PropTypes from 'prop-types'

class Freezable extends Component {
  static propTypes = {
    freeze: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    freeze: false,
    children: null,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.freeze !== true
  }

  render() {
    return this.props.children
  }
}

export default Freezable
