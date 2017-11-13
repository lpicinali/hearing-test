import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { T } from 'lioness'

import { isIndicatingHearingLoss } from 'src/evaluation.js'
import { P } from 'src/styles/elements.js'

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
        <P>
          <T>
            This test indicates that you may have a hearing loss and that you
            could benefit from wearing hearing aids.
          </T>
        </P>
        <P>
          <T>
            This test cannot replicate a clinical hearing assessment, so we
            recommend that you visit a Hearing Care Professional for a more
            accurate assessment and advice.
          </T>
        </P>
      </div>
    ) : (
      <div>
        <P>
          <T>
            This test indicates that your hearing is at a good level and that
            hearing aids would not be suitable for you at this time.
          </T>
        </P>
        <P>
          <T>
            This test cannot replicate a clinical hearing assessment, please
            visit a Hearing Care Professional for a more accurate hearing test.
          </T>
        </P>
      </div>
    )
  }
}

export default HearingLossCodeSummary
