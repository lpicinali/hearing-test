import { Component } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'

import { Ear } from 'src/constants.js'
import { withAudioContext } from 'src/components/AudioContextProvider.js'

/**
 * Tone
 */
class Tone extends Component {
  static propTypes = {
    audioContext: PropTypes.shape({}).isRequired,
    ear: PropTypes.oneOf(values(Ear)).isRequired,
    frequency: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { audioContext } = this.props

    this.osc = audioContext.createOscillator()
    this.osc.type = 'sine'

    this.volume = audioContext.createGain()

    // TODO: Not cross-browser
    this.panner = audioContext.createStereoPanner()

    this.updateAudio()

    this.osc.connect(this.volume)
    this.volume.connect(this.panner)
    this.panner.connect(audioContext.destination)

    this.osc.start()
  }

  componentDidUpdate() {
    this.updateAudio()
  }

  componentWillUnmount() {
    this.osc.stop()
    this.osc.disconnect()
    this.volume.disconnect()
    this.panner.disconnect()
  }

  updateAudio() {
    const { ear, frequency, value } = this.props

    this.osc.frequency.value = frequency
    this.volume.gain.value = value / 20
    this.panner.pan.value = ear === Ear.LEFT ? -1 : 1
  }

  render() {
    return null
  }
}

export default withAudioContext(Tone)
