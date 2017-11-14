import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { isIndicatingHearingLoss } from 'src/evaluation.js'
import { GRAY } from 'src/styles/colors.js'
import { P } from 'src/styles/elements.js'

const SmallP = styled(P)`
  font-size: 14px;
  color: ${GRAY};
`

/**
 * Hearing Loss Code Summary
 */
class HearingLossCodeSummary extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
  }

  render() {
    const { code } = this.props

    return isIndicatingHearingLoss(code) === true ? (
      <div>
        <SmallP>
          This test indicates that you may have a hearing loss and that you
          could benefit from wearing hearing aids.
        </SmallP>
        <SmallP>
          This test cannot replicate a clinical hearing assessment, so we
          recommend that you visit a Hearing Care Professional for a more
          accurate assessment and advice.
        </SmallP>
      </div>
    ) : (
      <div>
        <SmallP>
          This test indicates that your hearing is at a good level and that
          hearing aids would not be suitable for you at this time.
        </SmallP>
        <SmallP>
          This test cannot replicate a clinical hearing assessment, please visit
          a Hearing Care Professional for a more accurate hearing test.
        </SmallP>
      </div>
    )
  }
}

export default HearingLossCodeSummary
