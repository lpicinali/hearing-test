import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { connect } from 'react-redux'
import { clamp, last, values } from 'lodash'
import { autobind } from 'core-decorators'

import { setFrequencyLevel } from 'src/actions.js'
import {
  Ear,
  FrequencyStartVolume,
  TestDirection,
  TEST_FREQUENCIES,
} from 'src/constants.js'
import Tone from 'src/components/Tone.js'

/**
 * Ear Test Container
 */
class EarTestContainer extends Component {
  static propTypes = {
    ear: PropTypes.oneOf(values(Ear)).isRequired,
    earVolumes: IPropTypes.Map.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  }

  state = {
    frequency: TEST_FREQUENCIES[0],
    minVolume: FrequencyStartVolume[TEST_FREQUENCIES[0]],
    direction: TestDirection.UP,
  }

  @autobind
  next() {
    const { ear, earVolumes, onVolumeChange, onFinish } = this.props
    const { frequency, minVolume, direction } = this.state

    if (
      frequency === last(TEST_FREQUENCIES) &&
      direction === TestDirection.DOWN
    ) {
      onFinish()
    } else if (direction === TestDirection.DOWN) {
      this.setState(() => {
        const nextFrequency = TEST_FREQUENCIES.find(
          x => parseInt(x) > parseInt(frequency)
        )

        return {
          frequency: nextFrequency,
          minVolume: FrequencyStartVolume[nextFrequency],
          direction: TestDirection.UP,
        }
      })
    } else {
      this.setState(
        () => ({
          direction: TestDirection.DOWN,
        }),
        () => {
          // The start volume of the DOWN bit is +10 dB to the final
          // UP volume.
          onVolumeChange(
            ear,
            frequency,
            TestDirection.DOWN,
            clamp(
              earVolumes.getIn([frequency, TestDirection.UP]) + 10,
              minVolume,
              0
            )
          )
        }
      )
    }
  }

  render() {
    const { ear, earVolumes, onVolumeChange } = this.props
    const { frequency, minVolume, direction } = this.state

    const currentVolume = earVolumes.getIn([frequency, direction])

    return (
      <div className="EarTestContainer">
        Ear test: {ear}, {frequency}, {direction} {'->'} {currentVolume}
        <button
          disabled={currentVolume === minVolume}
          onClick={() =>
            onVolumeChange(
              ear,
              frequency,
              direction,
              clamp(currentVolume - 2, minVolume, 0)
            )}
        >
          -
        </button>
        <button
          disabled={currentVolume === 0}
          onClick={() =>
            onVolumeChange(
              ear,
              frequency,
              direction,
              clamp(currentVolume + 2, minVolume, 0)
            )}
        >
          +
        </button>
        <p>
          <button onClick={this.next}>Done</button>
        </p>
        <Tone
          ear={ear}
          frequency={parseInt(frequency)}
          volume={currentVolume}
        />
      </div>
    )
  }
}

export default connect(
  (state, { ear }) => ({
    earVolumes: state.getIn(['test', ear]),
  }),
  dispatch => ({
    onVolumeChange: (ear, frequency, direction, volume) =>
      dispatch(setFrequencyLevel(ear, frequency, direction, volume)),
  })
)(EarTestContainer)
