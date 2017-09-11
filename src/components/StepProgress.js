/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GRAY, WHITE, YELLOW } from 'src/styles/colors.js'

const StepState = {
  FUTURE: 'FUTURE',
  CURRENT: 'CURRENT',
  PAST: 'PAST',
}

const ProgressBar = styled.div`
  display: flex;
  height: 1px;
`

const ProgressStep = styled.div`
  flex-grow: 1;
  height: 100%;
  margin-right: 2px;
  background-color: ${props => {
    if (props.stepState === StepState.PAST) {
      return WHITE
    } else if (props.stepState === StepState.CURRENT) {
      return YELLOW
    }
    return GRAY
  }};
  transition: background-color 0.3s;
`

function getStepState(step, currentStep) {
  if (step > currentStep) {
    return StepState.FUTURE
  } else if (step === currentStep) {
    return StepState.CURRENT
  }
  return StepState.PAST
}

/**
 * Step Progress
 */
class StepProgress extends Component {
  static propTypes = {
    numSteps: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }

  render() {
    const { numSteps, step } = this.props

    return (
      <ProgressBar>
        {new Array(numSteps)
          .fill(null)
          .map((endlessVoid, i) => (
            <ProgressStep key={i} stepState={getStepState(i + 1, step)} />
          ))}
      </ProgressBar>
    )
  }
}

export default StepProgress
