import { Component } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'

import { Ear } from 'src/constants.js'
import { withAudioContext } from 'src/components/AudioContextProvider.js'
import { decibelsToGain } from 'src/utils.js'

/**
 * Tone
 */
class Tone extends Component {
  static propTypes = {
    audioContext: PropTypes.shape({}).isRequired,
    ear: PropTypes.oneOf(values(Ear)),
    frequency: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  }

  static defaultProps = {
    ear: null,
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
    const { ear, frequency, volume } = this.props

    let pan = 0
    if (ear === Ear.LEFT) {
      pan = -1
    } else if (ear === Ear.RIGHT) {
      pan = 1
    }

    this.osc.frequency.value = frequency
    this.volume.gain.value = decibelsToGain(volume)
    this.panner.pan.value = pan
  }

  render() {
    return null
  }
}

export default withAudioContext(Tone)
