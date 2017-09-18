import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { map, zip } from 'lodash'

import configs from 'src/configs.js'
import { Ear, TEST_FREQUENCIES } from 'src/constants.js'
import Audiogram from 'src/components/Audiogram.js'

/**
 * Results Doc
 */
class ResultsDoc extends PureComponent {
  static propTypes = {
    audiograms: PropTypes.shape({}).isRequired,
    codes: PropTypes.shape({}),
    questionnaire: PropTypes.shape({}),
  }

  static defaultProps = {
    codes: null,
    questionnaire: null,
  }

  render() {
    const { audiograms, codes, questionnaire } = this.props

    const leftAudiogramData = new Map(
      zip(TEST_FREQUENCIES, audiograms[Ear.LEFT])
    )
    const rightAudiogramData = new Map(
      zip(TEST_FREQUENCIES, audiograms[Ear.RIGHT])
    )

    return (
      <div>
        <header className="Header">
          <h1>3D Tune-In Hearing Test Results</h1>

          <p>
            These are your hearing test results. Visit http://3d-tune-in.eu/ for
            more information about the 3D Tune-In project and apps.
          </p>
        </header>

        {configs.HAS_CODES && (
          <div>
            <h2>Hearing loss severity score</h2>

            <p>
              You can use these codes to automatically calibrate any of the 3D
              Tune-In applications, so make a note of them.
            </p>

            <div className="Row">
              <div className="Col">
                <h5>Left ear</h5>
                <div className="HearingLossCode">{codes[Ear.LEFT]}</div>
              </div>

              <div className="Col">
                <h5>Right ear</h5>
                <div className="HearingLossCode">{codes[Ear.RIGHT]}</div>
              </div>
            </div>
          </div>
        )}

        <h2>Audiograms</h2>

        <p>
          These are diagrams that describe your hearing threshold for different
          frequencies.
        </p>

        <div className="Row">
          <div className="Col">
            <h5>Left ear</h5>
            <Audiogram
              ear={Ear.LEFT}
              data={leftAudiogramData}
              isInteractive={false}
            />
          </div>
          <div className="Col">
            <h5>Right ear</h5>
            <Audiogram
              ear={Ear.RIGHT}
              data={rightAudiogramData}
              isInteractive={false}
            />
          </div>
        </div>

        {configs.HAS_QUESTIONNAIRE && (
          <div>
            <h2>Questionnaire</h2>

            {map(questionnaire, (value, questionKey) => (
              <p key={questionKey}>
                {questionKey}: {value}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default ResultsDoc
