import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { identity, map, zip } from 'lodash'

import configs from 'src/configs.js'
import {
  Ear,
  QuestionnaireField,
  QuestionnaireGroup,
  TestFrequencies,
} from 'src/constants.js'
import getQuestionnaire from 'src/questionnaire.js'
import Audiogram from 'src/components/Audiogram.js'

const TEST_FREQUENCIES = TestFrequencies[configs.EXTENT]

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

    const audiogramRatio = 350 / 280
    const audiogramWidth = 220
    const audiogramHeight = audiogramWidth / audiogramRatio

    const questionnaireForm = getQuestionnaire(identity)
    const recommendationQuestion =
      questionnaireForm[QuestionnaireGroup.THREE][
        QuestionnaireField.RECOMMENDATION_LIKELIHOOD
      ]

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
              width={audiogramWidth}
              height={audiogramHeight}
              isInteractive={false}
            />
          </div>
          <div className="Col">
            <h5>Right ear</h5>
            <Audiogram
              ear={Ear.RIGHT}
              data={rightAudiogramData}
              width={audiogramWidth}
              height={audiogramHeight}
              isInteractive={false}
            />
          </div>
        </div>

        {configs.HAS_QUESTIONNAIRE && (
          <div>
            <h2>Questionnaire</h2>
            <h3>Part one</h3>
            <p>
              <strong>
                Please assess the hearing test now by ticking one checkbox per
                line.
              </strong>
            </p>
            {map(
              questionnaireForm[QuestionnaireGroup.ONE],
              (field, questionKey) => (
                <p key={questionKey}>
                  {field.minLabel}/{field.maxLabel}:{' '}
                  {questionnaire[questionKey]}/7
                </p>
              )
            )}
            <h3>Part two</h3>
            <p>
              Finally here are some further questions to further evaluate your
              experience with the hearing test application.
            </p>
            {map(
              questionnaireForm[QuestionnaireGroup.TWO],
              (field, questionKey) => (
                <p key={questionKey}>
                  <strong>{field.label}</strong>
                  <br />
                  {field.minLabel}/{field.maxLabel}:{' '}
                  {questionnaire[questionKey]}/7
                </p>
              )
            )}
            <h3>Part three</h3>
            <p>
              <strong>
                Lastly, to what extent would you recommend this hearing test
                application to another adult with cystic fibrosis?
              </strong>
              <br />
              {recommendationQuestion.minLabel}/{recommendationQuestion.maxLabel}:{' '}
              {questionnaire[QuestionnaireField.RECOMMENDATION_LIKELIHOOD]}/10
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default ResultsDoc
