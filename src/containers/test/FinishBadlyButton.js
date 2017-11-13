import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { forEach, pick, zipObject } from 'lodash'
import { T } from 'lioness'

import { calculateAudiograms, setFrequencyLevel } from 'src/actions.js'
import configs from 'src/configs.js'
import {
  AUDIOGRAM_FREQUENCIES,
  Ear,
  TestDirection,
  TestFrequencies,
} from 'src/constants.js'

/**
 * Finish Badly Button
 */
class FinishBadlyButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { onClick } = this.props

    return (
      <button onClick={onClick}>
        <T>Fail badly</T>
      </button>
    )
  }
}

export default connect(null, dispatch => ({
  onClick: () => {
    const badValues = zipObject(AUDIOGRAM_FREQUENCIES, [
      -40,
      -40,
      -30,
      -25,
      -10,
      -10,
      -5,
    ])
    const relevantBadValues = pick(badValues, TestFrequencies[configs.EXTENT])

    forEach(relevantBadValues, (value, frequency) => {
      dispatch(setFrequencyLevel(Ear.LEFT, frequency, TestDirection.UP, value))
      dispatch(
        setFrequencyLevel(Ear.LEFT, frequency, TestDirection.DOWN, value)
      )
      dispatch(
        setFrequencyLevel(
          Ear.RIGHT,
          frequency,
          TestDirection.UP,
          value + frequency / 100
        )
      )
      dispatch(
        setFrequencyLevel(
          Ear.RIGHT,
          frequency,
          TestDirection.DOWN,
          value + frequency / 100
        )
      )
    })

    dispatch(calculateAudiograms())
  },
}))(FinishBadlyButton)
