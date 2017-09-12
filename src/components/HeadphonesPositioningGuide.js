import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Ear } from 'src/constants.js'
import Audio from 'src/components/Audio.js'
import Headphones from 'src/components/Headphones.js'

function getNextEar(currentEar) {
  if (currentEar === Ear.LEFT) {
    return Ear.RIGHT
  } else if (currentEar === Ear.RIGHT) {
    return null
  }

  return Ear.LEFT
}

const EmbeddedHeadphones = styled(Headphones)`margin: 24px 0;`

/**
 * Headphones Positiong Guide
 */
class HeadphonesPositiongGuide extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    toneDuration: PropTypes.number.isRequired,
  }

  static defaultProps = {
    isActive: false,
  }

  state = {
    currentEar: Ear.LEFT,
  }

  componentDidMount() {
    this.timerId = null
    this.iteration()
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  iteration() {
    const { toneDuration } = this.props
    const { currentEar } = this.state

    this.setState(() => ({ isSounding: true }))
    this.timerId = setTimeout(
      () =>
        this.setState(
          {
            currentEar: getNextEar(currentEar),
          },
          () => this.iteration()
        ),
      toneDuration
    )
  }

  render() {
    const { isActive } = this.props
    const { currentEar } = this.state

    return (
      <div className="HeadphonesPositiongGuide">
        <EmbeddedHeadphones activeEar={currentEar} />

        {isActive === true && (
          <Audio ear={currentEar} name="guitar" volume={-18} />
        )}
      </div>
    )
  }
}

export default HeadphonesPositiongGuide
