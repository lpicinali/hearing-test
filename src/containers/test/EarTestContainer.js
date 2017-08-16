import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { connect } from 'react-redux'
import { last, values } from 'lodash'
import { clamp } from 'lodash/fp'
import { autobind } from 'core-decorators'

import { setFrequencyLevel } from 'src/actions.js'
import { Ear, SILENCE, TestDirection, TEST_FREQUENCIES } from 'src/constants.js'
import Tone from 'src/components/Tone.js'

const clampDb = clamp(SILENCE, 0)

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
    direction: TestDirection.UP,
  }

  @autobind
  next() {
    const { ear, earVolumes, onVolumeChange, onFinish } = this.props
    const { frequency, direction } = this.state

    if (
      frequency === last(TEST_FREQUENCIES) &&
      direction === TestDirection.DOWN
    ) {
      onFinish()
    } else if (direction === TestDirection.DOWN) {
      this.setState(() => ({
        frequency: TEST_FREQUENCIES.find(
          x => parseInt(x) > parseInt(frequency)
        ),
        direction: TestDirection.UP,
      }))
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
            clampDb(earVolumes.getIn([frequency, TestDirection.UP]) + 10)
          )
        }
      )
    }
  }

  render() {
    const { ear, earVolumes, onVolumeChange } = this.props
    const { frequency, direction } = this.state

    const currentVolume = earVolumes.getIn([frequency, direction])

    return (
      <div className="EarTestContainer">
        Ear test: {ear}, {frequency}, {direction} {'->'} {currentVolume}
        <button
          disabled={currentVolume === 0}
          onClick={() =>
            onVolumeChange(
              ear,
              frequency,
              direction,
              clampDb(currentVolume - 2)
            )}
        >
          -
        </button>
        <button
          onClick={() =>
            onVolumeChange(
              ear,
              frequency,
              direction,
              clampDb(currentVolume + 2)
            )}
        >
          +
        </button>
        <button onClick={this.next}>Done</button>
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
