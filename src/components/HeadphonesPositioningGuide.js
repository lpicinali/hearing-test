import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Ear, SILENCE } from 'src/constants.js'
import Headphones from 'src/components/Headphones.js'
import Tone from 'src/components/Tone.js'

function getNextEar(currentEar) {
  if (currentEar === Ear.LEFT) {
    return Ear.RIGHT
  } else if (currentEar === Ear.RIGHT) {
    return null
  }

  return Ear.LEFT
}

/**
 * Headphones Positiong Guide
 */
class HeadphonesPositiongGuide extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    toneDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
  }

  static defaultProps = {
    isActive: false,
  }

  state = {
    currentEar: Ear.LEFT,
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
              currentEar: getNextEar(currentEar),
              isSounding: false,
            }),
            () => this.iteration()
          ),
        toneDuration
      )
    }, restDuration)
  }

  render() {
    const { isActive } = this.props
    const { currentEar, isSounding } = this.state

    return (
      <div className="HeadphonesPositiongGuide">
        <Headphones activeEar={currentEar} />

        {isActive === true &&
          <Tone
            ear={currentEar}
            frequency={440}
            volume={isSounding ? -30 : SILENCE}
          />}
      </div>
    )
  }
}

export default HeadphonesPositiongGuide
