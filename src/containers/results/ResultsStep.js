import React, { Component } from 'react'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

/**
 * Results Step
 */
class ResultsStep extends Component {
  render() {
    return (
      <div className="ResultsStep">
        <h1>The test is now completed.</h1>
        <p>
          In the next page you’ll find your hearing threshold curves for both
          left and right ears.
        </p>
        <p>
          On the top of each diagram you will be able to find your 3D Tune-In
          heading loss severity score, which will be useful in case you will
          want to play with 3D Tune-In apps in the future.
        </p>

        <h2>Audiogram</h2>

        <h3>Left ear</h3>
        <code>Audiogram</code>

        <h3>Right ear</h3>
        <code>Audiogram</code>

        <h2>3D Tune-In Hearing Loss Codes</h2>
        <p>
          You can use this code to automatically calibrate any of the 3D Tune-In
          applications, so make a note of it.
        </p>
        <code>Codes here</code>

        <h2>
          Enter your e-mail address here to have this information sent to you:
        </h2>
        <input type="email" placeholder="name@example.com" />

        <p>
          <a href="#">Click here</a> for more information about the 3D Tune-In
          project and apps.
        </p>

        <LinkButton to={AppUrl.THANK_YOU}>Next</LinkButton>
      </div>
    )
  }
}

export default ResultsStep
