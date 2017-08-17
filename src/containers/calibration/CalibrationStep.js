import React from 'react'
import { T } from 'lioness'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import HeadphonesPositioningGuide from 'src/components/HeadphonesPositioningGuide.js'
import { H2, H3, P } from 'src/styles/elements.js'

const CalibrationUrl = {
  AUDIO_LEVEL: `${AppUrl.CALIBRATION}/audio-level`,
  HEADPHONES_POSITIONING: `${AppUrl.CALIBRATION}/headphones-positioning`,
  LEAVE_IT_BE: `${AppUrl.CALIBRATION}/leave-it-be`,
}

export default function CalibrationStep() {
  return (
    <div>
      <H2>
        <T>Calibration</T>
      </H2>

      <Switch>
        <Route
          exact
          path={CalibrationUrl.AUDIO_LEVEL}
          render={() =>
            <div>
              <H3>
                <T>Audio level</T>
              </H3>
              <P>
                <T>
                  Adjust the audio level until this sound is comfortably
                  audible.
                </T>
              </P>
              <LinkButton to={CalibrationUrl.HEADPHONES_POSITIONING}>
                <T>Next</T>
              </LinkButton>
            </div>}
        />

        <Route
          exact
          path={CalibrationUrl.HEADPHONES_POSITIONING}
          render={() =>
            <div>
              <H3>
                <T>Headphones positioning</T>
              </H3>
              <P>
                <T>Check the headphones positioning.</T>
              </P>
              <HeadphonesPositioningGuide
                toneDuration={3000}
                restDuration={1000}
              />
              <LinkButton to={CalibrationUrl.LEAVE_IT_BE}>
                <T>Next</T>
              </LinkButton>
            </div>}
        />

        <Route
          exact
          path={CalibrationUrl.LEAVE_IT_BE}
          render={() =>
            <div>
              <P>
                <T>
                  Please do not change/modify the audio level during the test.
                </T>
              </P>
              <LinkButton to={AppUrl.TEST}>
                <T>Next</T>
              </LinkButton>
            </div>}
        />

        <Redirect to={CalibrationUrl.AUDIO_LEVEL} />
      </Switch>
    </div>
  )
}
