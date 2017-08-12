import { Children, Component } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

const childContextTypes = {
  audioContext: PropTypes.object,
}

/**
 * Audio Context Provider
 */
class AudioContextProvider extends Component {
  static propTypes = {
    audioContext: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    ...childContextTypes,
  }

  getChildContext() {
    const { audioContext } = this.props
    return { audioContext }
  }

  render() {
    const { children } = this.props
    return Children.only(children)
  }
}

export default AudioContextProvider

/**
 * withAudioContext
 */
export function withAudioContext(Comp) {
  return getContext(childContextTypes)(Comp)
}
