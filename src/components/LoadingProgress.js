import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BLACK, WHITE } from 'src/styles/colors.js'

const ProgressWrapper = styled.div`
  width: 95%;
  max-width: 240px;
`

const ProgressLabel = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 24px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  overflow: hidden;
  background: ${BLACK};
  border-radius: 2px;
`

const ProgressBarValue = styled.div`
  height: 100%;
  background: ${WHITE};
  transition: width 0.3s;
`

/**
 * Loading Progress
 */
class LoadingProgress extends PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    label: PropTypes.string,
  }

  static defaultProps = {
    label: '',
  }

  render() {
    const { progress, label } = this.props

    return (
      <ProgressWrapper>
        {label &&
          <ProgressLabel>
            {label}
          </ProgressLabel>}

        <ProgressBar>
          <ProgressBarValue style={{ width: `${progress * 100}%` }} />
        </ProgressBar>
      </ProgressWrapper>
    )
  }
}

export default LoadingProgress
