import React, { Component } from 'react'
import IPropTypes from 'immutable-props'
import { T } from 'lioness'
import { connect } from 'react-redux'

import { AppUrl, Ear } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import { H2, H3, H4, TextInput } from 'src/styles/elements.js'

/**
 * Results Step
 */
class ResultsStep extends Component {
  static propTypes = {
    results: IPropTypes.Map.isRequired,
  }

  render() {
    const { results } = this.props

    const leftAudiogram = results.getIn(['audiograms', Ear.LEFT])
    const rightAudiogram = results.getIn(['audiograms', Ear.RIGHT])

    return (
      <div className="ResultsStep">
        <H2>
          <T>The test is now completed.</T>
        </H2>
        <T
          message={`
          {{ p:In the next page you’ll find your hearing threshold curves for both left and right ears. }}
          {{ p:On the top of each diagram you will be able to find your 3D Tune-In heading loss severity score, which will be useful in case you will want to play with 3D Tune-In apps in the future. }}
        `}
          p={<p />}
        />

        <H3>
          <T>Audiograms</T>
        </H3>

        <H4>
          <T>Left ear</T>
        </H4>
        <code>
          {leftAudiogram ? leftAudiogram.toJS().join(', ') : 'Audiogram'}
        </code>

        <H4>
          <T>Right ear</T>
        </H4>
        <code>
          {rightAudiogram ? rightAudiogram.toJS().join(', ') : 'Audiogram'}
        </code>

        <H3>
          <T>3D Tune-In Hearing Loss Codes</T>
        </H3>
        <p>
          <T>
            You can use this code to automatically calibrate any of the 3D
            Tune-In applications, so make a note of it.
          </T>
        </p>
        <code>Codes here</code>

        <H3>
          <T>
            Enter your e-mail address here to have this information sent to you:
          </T>
        </H3>
        <TextInput type="email" placeholder="name@example.com" />

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

export default connect(state => ({
  results: state.get('results'),
}))(ResultsStep)
