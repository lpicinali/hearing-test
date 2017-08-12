import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { connect } from 'react-redux'
import { last, values } from 'lodash'
import { autobind } from 'core-decorators'

import { setFrequencyLevel } from 'src/actions.js'
import { Ear, TestDirection, TEST_FREQUENCIES } from 'src/constants.js'

/**
 * Ear Test Container
 */
class EarTestContainer extends Component {
  static propTypes = {
    ear: PropTypes.oneOf(values(Ear)).isRequired,
    earValues: IPropTypes.Map.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  }

  state = {
    frequency: TEST_FREQUENCIES[0],
    direction: TestDirection.UP,
  }

  @autobind
  next() {
    const { onFinish } = this.props
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
      this.setState(() => ({
        direction: TestDirection.DOWN,
      }))
    }
  }

  render() {
    const { ear, earValues, onValueChange } = this.props
    const { frequency, direction } = this.state

    const currentValue = earValues.getIn([frequency, direction])

    return (
      <div className="EarTestContainer">
        Ear test: {ear}, {frequency}, {direction} {'->'} {currentValue}
        <button
          disabled={currentValue === 0}
          onClick={() =>
            onValueChange(ear, frequency, direction, currentValue - 1)}
        >
          -
        </button>
        <button
          onClick={() =>
            onValueChange(ear, frequency, direction, currentValue + 1)}
        >
          +
        </button>
        <button onClick={this.next}>Done</button>
      </div>
    )
  }
}

export default connect(
  (state, { ear }) => ({
    earValues: state.getIn(['test', ear]),
  }),
  dispatch => ({
    onValueChange: (ear, frequency, direction, value) =>
      dispatch(setFrequencyLevel(ear, frequency, direction, value)),
  })
)(EarTestContainer)
