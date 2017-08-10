import React, { Component } from 'react'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

/**
 * Test Step
 */
class TestStep extends Component {
  render() {
    return (
      <div className="TestStep">
        <h1>Test step</h1>

        <LinkButton to={AppUrl.RESULTS}>Go to Results</LinkButton>
      </div>
    )
  }
}

export default TestStep
