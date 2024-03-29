import React from 'react'
import PropTypes from 'prop-types'
import { T } from 'lioness'
// import { withRouter } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import Audio from 'src/components/Audio.js'
import { LinkButton } from 'src/components/Button.js'
import HeadphonesPositioningGuide from 'src/components/HeadphonesPositioningGuide.js'
import { H2, H4, P } from 'src/styles/elements.js'
import { Row, StatefulCol } from 'src/styles/grid.js'

const CalibrationUrl = {
  START_WITH_SILENCE: `${AppUrl.CALIBRATION}/start-with-silence`,
  ADJUST_LEVEL: `${AppUrl.CALIBRATION}/adjust-level`,
  HEADPHONES_POSITIONING: `${AppUrl.CALIBRATION}/headphones-positioning`,
  LEAVE_IT_BE: `${AppUrl.CALIBRATION}/leave-it-be`,
}

function CalibrationStep({ match }) {
  return (
    <div>
      <H2>
        <T>Calibration</T>
      </H2>

      <Row>
        <StatefulCol size={1 / 4} isActive={match.url === AppUrl.CALIBRATION}>
          <H4>
            <T>Find a quiet place</T>
          </H4>

          <P>
            <T>
              This test requires no or little background noise to give good
              results.
            </T>
          </P>
          <LinkButton to={CalibrationUrl.START_WITH_SILENCE}>
            <T>Found it</T>
          </LinkButton>
        </StatefulCol>

        <StatefulCol
          size={1 / 4}
          isActive={match.url === CalibrationUrl.START_WITH_SILENCE}
        >
          <H4>
            <T>Start with silence</T>
          </H4>

          <P>
            <T>Put on your headphones and set the volume at 0.</T>
          </P>
          <LinkButton to={CalibrationUrl.ADJUST_LEVEL}>
            <T>Continue</T>
          </LinkButton>
        </StatefulCol>

        <StatefulCol
          size={1 / 4}
          isActive={match.url === CalibrationUrl.ADJUST_LEVEL}
        >
          <H4>
            <T>Adjust audio level</T>
          </H4>

          <P>
            <T>
              Adjust the audio level until this sound is comfortably audible.
            </T>
          </P>
          <LinkButton to={CalibrationUrl.HEADPHONES_POSITIONING}>
            <T>Continue</T>
          </LinkButton>

          {match.url === CalibrationUrl.ADJUST_LEVEL && (
            <Audio name="guitar" volume={-18} />
          )}
        </StatefulCol>

        <StatefulCol
          size={1 / 4}
          isActive={match.url === CalibrationUrl.HEADPHONES_POSITIONING}
        >
          <H4>
            <T>Headphones positioning</T>
          </H4>

          <P>
            <T>Check that you are wearing your headphones correctly.</T>
          </P>

          <HeadphonesPositioningGuide
            toneDuration={4000}
            isActive={match.url === CalibrationUrl.HEADPHONES_POSITIONING}
          />

          <LinkButton to={AppUrl.PRACTICE}>
            <T>Continue</T>
          </LinkButton>
        </StatefulCol>
      </Row>
    </div>
  )
}

CalibrationStep.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
}

export default CalibrationStep
