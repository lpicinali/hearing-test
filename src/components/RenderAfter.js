import { Children, Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Render After
 */
class RenderAfter extends Component {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    isRendered: false,
  }

  componentDidMount() {
    const { delay } = this.props
    setTimeout(() => this.setState({ isRendered: true }), delay)
  }

  render() {
    const { children } = this.props
    const { isRendered } = this.state

    return isRendered === true ? Children.only(children) : null
  }
}

export default RenderAfter
