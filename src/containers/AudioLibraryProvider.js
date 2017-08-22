import { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

import { withAudioContext } from 'src/components/AudioContextProvider.js'
import { fetchAudioBuffer } from 'src/utils.js'

const childContextTypes = {
  sourceBuffers: PropTypes.array,
}

/**
 * Audio Library Provider
 */
class AudioLibraryProvider extends PureComponent {
  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    audioContext: PropTypes.shape({
      decodeAudioData: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    ...childContextTypes,
  }

  state = {
    sourceBuffers: [],
  }

  getChildContext() {
    const { sourceBuffers } = this.state
    return { sourceBuffers }
  }

  componentDidMount() {
    const { files, audioContext } = this.props
    Promise.all(
      files.map(({ name, url }) =>
        fetchAudioBuffer(url)
          .then(buffer => audioContext.decodeAudioData(buffer))
          .then(audioBuffer => ({ name, url, audioBuffer }))
      )
    ).then(sourceBuffers => this.setState({ sourceBuffers }))
  }

  render() {
    const { children } = this.props
    const { sourceBuffers } = this.state

    return sourceBuffers.length > 0 ? Children.only(children) : null
  }
}

export default withAudioContext(AudioLibraryProvider)

/**
 * withAudioLibrary
 */
export function withAudioLibrary(Comp) {
  return getContext(childContextTypes)(Comp)
}
