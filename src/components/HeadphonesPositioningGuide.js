import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Ear } from 'src/constants.js'
import Tone from 'src/components/Tone.js'

/**
 * Headphones Positiong Guide
 */
class HeadphonesPositiongGuide extends Component {
  static propTypes = {
    toneDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
  }

  state = {
    currentEar: null,
    isSounding: false,
  }

  componentDidMount() {
    this.timerId = null
    this.iteration()
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  iteration() {
    const { toneDuration, restDuration } = this.props
    const { currentEar } = this.state

    this.timerId = setTimeout(() => {
      this.setState(() => ({ isSounding: true }))
      this.timerId = setTimeout(
        () =>
          this.setState(
            () => ({
              currentEar: currentEar === Ear.LEFT ? Ear.RIGHT : Ear.LEFT,
              isSounding: false,
            }),
            () => this.iteration()
          ),
        toneDuration
      )
    }, restDuration)
  }

  render() {
    const { currentEar, isSounding } = this.state

    return (
      <div className="HeadphonesPositiongGuide">
        <p>
          Ear: {currentEar}
        </p>
        {currentEar !== null &&
          <Tone ear={currentEar} frequency={440} value={isSounding ? 1 : 0} />}
      </div>
    )
  }
}

export default HeadphonesPositiongGuide
