/* global AudioBuffer */
import 'stereo-panner-shim'
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'
import { compose, mapProps } from 'recompose'

import audioFiles from 'src/audio/audio-files.js'
import { withAudioContext } from 'src/components/AudioContextProvider.js'
import { withAudioLibrary } from 'src/containers/AudioLibraryProvider.js'
import { Ear, SILENCE } from 'src/constants.js'
import { decibelsToGain } from 'src/utils.js'

/**
 * Audio
 */
class Audio extends PureComponent {
  static propTypes = {
    name: PropTypes.oneOf(audioFiles.map(({ name }) => name)).isRequired, // eslint-disable-line
    ear: PropTypes.oneOf(values(Ear)),
    volume: PropTypes.number.isRequired,
    audioBuffer: PropTypes.instanceOf(AudioBuffer).isRequired,
    audioContext: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    ear: null,
  }

  componentDidMount() {
    const { audioContext } = this.props

    this.volume = audioContext.createGain()
    this.volume.gain.value = decibelsToGain(SILENCE)

    // TODO: Not cross-browser
    this.panner = audioContext.createStereoPanner()

    this.createSource()
    this.updateAudio()

    this.volume.connect(this.panner)
    this.panner.connect(audioContext.destination)
  }

  componentDidUpdate(prevProps) {
    const { name } = this.props

    if (prevProps.name !== name) {
      this.createSource()
    }

    this.updateAudio()
  }

  componentWillUnmount() {
    this.source.stop()
    this.source.disconnect()
    this.volume.disconnect()
    this.panner.disconnect()
  }

  createSource() {
    const { audioContext, audioBuffer } = this.props

    if (this.source) {
      this.source.stop()
      this.source.disconnect()
    }

    this.source = audioContext.createBufferSource()
    this.source.buffer = audioBuffer
    this.source.loop = true
    this.source.connect(this.volume)
    this.source.start()
  }

  updateAudio() {
    const { audioContext, ear, volume } = this.props

    let pan = 0
    if (ear === Ear.LEFT) {
      pan = -1
    } else if (ear === Ear.RIGHT) {
      pan = 1
    }

    // Ramping to 0 throws an error
    const toGain = decibelsToGain(volume) + 0.00000001
    const toPan = pan + (pan > 0 ? -0.0001 : 0.0001)

    const endTime = audioContext.currentTime + 0.1

    this.volume.gain.linearRampToValueAtTime(toGain, endTime)
    this.panner.pan.linearRampToValueAtTime(toPan, endTime)
  }

  render() {
    return null
  }
}

export default compose(
  withAudioContext,
  withAudioLibrary,
  mapProps(({ sourceBuffers, name, ...rest }) => ({
    ...rest,
    name,
    audioBuffer:
      sourceBuffers.length > 0
        ? sourceBuffers.find(x => x.name === name).audioBuffer
        : null,
  }))
)(Audio)
