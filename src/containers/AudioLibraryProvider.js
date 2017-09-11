/* global window */
import React, { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose, getContext } from 'recompose'
import styled from 'styled-components'
import { withTranslators } from 'lioness'

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
  opacity: ${props => (props.isDone ? '0' : '1')};
  transition: opacity 0.5s;
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
    t: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    ...childContextTypes,
  }

  state = {
    numLoaded: 0,
    sourceBuffers: [],
    isFading: false,
    isReady: false,
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

  componentDidUpdate() {
    const { sourceBuffers } = this.state

    if (sourceBuffers.length > 0) {
      window.setTimeout(() => this.setState({ isFading: true }), 500)
      window.setTimeout(() => this.setState({ isReady: true }), 1500)
    }
  }

  render() {
    const { files, t, children } = this.props
    const { numLoaded, isFading, isReady } = this.state

    return isReady === true ? (
      Children.only(children)
    ) : (
      <LoadingProgressWrapper isDone={isFading}>
        <LoadingProgress
          label={t('Initialising hearing test...')}
          progress={numLoaded / files.length}
        />
      </LoadingProgressWrapper>
    )
  }
}

export default compose(withTranslators, withAudioContext)(AudioLibraryProvider)

/**
 * withAudioLibrary
 */
export function withAudioLibrary(Comp) {
  return getContext(childContextTypes)(Comp)
}
