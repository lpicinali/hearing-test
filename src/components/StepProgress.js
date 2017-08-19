/* eslint no-array-index-key: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { YELLOW, GRAY } from 'src/styles/colors.js'

const ProgressBar = styled.div`
  display: flex;
  height: 1px;
`

const ProgressStep = styled.div`
  flex-grow: 1;
  height: 100%;
  margin-right: 2px;
  background-color: ${props => (props.isActive ? YELLOW : GRAY)};
`

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
          .map((endlessVoid, i) =>
            <ProgressStep key={i} isActive={step >= i + 1} />
          )}
      </ProgressBar>
    )
  }
}

export default StepProgress
