import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import styled from 'styled-components'

import { withAudioContext } from 'src/components/AudioContextProvider.js'
import LoadingProgress from 'src/components/LoadingProgress.js'
import { fetchAudioBuffer } from 'src/utils.js'

const childContextTypes = {
  sourceBuffers: PropTypes.array,
}

const LoadingProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

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
    numLoaded: 0,
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
          .then(audioBuffer => {
            this.setState(() => ({ numLoaded: this.state.numLoaded + 1 }))
            return audioBuffer
          })
          .then(audioBuffer => ({ name, url, audioBuffer }))
      )
    ).then(sourceBuffers => this.setState({ sourceBuffers }))
  }

  render() {
    const { files, children } = this.props
    const { numLoaded, sourceBuffers } = this.state

    return sourceBuffers.length > 0 ? (
      Children.only(children)
    ) : (
      <LoadingProgressWrapper>
        <LoadingProgress
          label="Loading audio files..."
          progress={numLoaded / files.length}
        />
      </LoadingProgressWrapper>
    )
  }
}

export default withAudioContext(AudioLibraryProvider)

/**
 * withAudioLibrary
 */
export function withAudioLibrary(Comp) {
  return getContext(childContextTypes)(Comp)
}
