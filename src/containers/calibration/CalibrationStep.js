import React from 'react'
import { T } from 'lioness'
import { Route, Switch } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

const CalibrationUrl = {
  AUDIO_LEVEL: `${AppUrl.CALIBRATION}/audio-level`,
  HEADPHONES_POSITIONING: `${AppUrl.CALIBRATION}/headphones-positioning`,
  LEAVE_IT_BE: `${AppUrl.CALIBRATION}/leave-it-be`,
}

export default function CalibrationStep() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={AppUrl.CALIBRATION}
          render={() =>
            <div>
              <h1>
                <T>We will now start the test</T>
              </h1>
              <LinkButton to={CalibrationUrl.AUDIO_LEVEL}>Next</LinkButton>
            </div>}
        />

        <Route
          exact
          path={CalibrationUrl.AUDIO_LEVEL}
          render={() =>
            <div>
              <h1>
                <T>Audio level</T>
              </h1>
              <p>
                Adjust the audio level until this sound is comfortably audible.
              </p>
              <LinkButton to={CalibrationUrl.HEADPHONES_POSITIONING}>
                Next
              </LinkButton>
            </div>}
        />

        <Route
          exact
          path={CalibrationUrl.HEADPHONES_POSITIONING}
          render={() =>
            <div>
              <h1>
                <T>Headphones positioning</T>
              </h1>
              <p>Check the headphones positioning.</p>
              <LinkButton to={CalibrationUrl.LEAVE_IT_BE}>Next</LinkButton>
            </div>}
        />

        <Route
          exact
          path={CalibrationUrl.LEAVE_IT_BE}
          render={() =>
            <div>
              <p>
                Please do not change/modify the audio level during the test.
              </p>
              <LinkButton to={AppUrl.TEST}>Next</LinkButton>
            </div>}
        />
      </Switch>
    </div>
  )
}
