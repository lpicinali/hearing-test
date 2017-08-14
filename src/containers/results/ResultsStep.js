import React, { Component } from 'react'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

/**
 * Results Step
 */
class ResultsStep extends Component {
  render() {
    return (
      <div className="ResultsStep">
        <h1>
          <T>The test is now completed.</T>
        </h1>
        <T
          message={`
          {{ p:In the next page you’ll find your hearing threshold curves for both left and right ears. }}
          {{ p:On the top of each diagram you will be able to find your 3D Tune-In heading loss severity score, which will be useful in case you will want to play with 3D Tune-In apps in the future. }}
        `}
        />

        <h2>
          <T>Audiograms</T>
        </h2>

        <h3>
          <T>Left ear</T>
        </h3>
        <code>Audiogram</code>

        <h3>
          <T>Right ear</T>
        </h3>
        <code>Audiogram</code>

        <h2>
          <T>3D Tune-In Hearing Loss Codes</T>
        </h2>
        <p>
          <T>
            You can use this code to automatically calibrate any of the 3D
            Tune-In applications, so make a note of it.
          </T>
        </p>
        <code>Codes here</code>

        <h2>
          <T>
            Enter your e-mail address here to have this information sent to you:
          </T>
        </h2>
        <input type="email" placeholder="name@example.com" />

        <p>
          <T
            message="{{ link:Click here }} for more information about the 3D Tune-In project and apps."
            link={<a href="http://3d-tune-in.eu/" target="_blank" />}
          />
        </p>

        <LinkButton to={AppUrl.THANK_YOU}>Next</LinkButton>
      </div>
    )
  }
}

export default ResultsStep
