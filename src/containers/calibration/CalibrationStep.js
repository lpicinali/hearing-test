import React from 'react'
import { T } from 'lioness'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import HeadphonesPositioningGuide from 'src/components/HeadphonesPositioningGuide.js'

const CalibrationUrl = {
  AUDIO_LEVEL: `${AppUrl.CALIBRATION}/audio-level`,
  HEADPHONES_POSITIONING: `${AppUrl.CALIBRATION}/headphones-positioning`,
  LEAVE_IT_BE: `${AppUrl.CALIBRATION}/leave-it-be`,
}

export default function CalibrationStep() {
  return (
    <div>
      <h1>
        <T>Calibration</T>
      </h1>

      <Switch>
        <Route
          exact
          path={CalibrationUrl.AUDIO_LEVEL}
          render={() =>
            <div>
              <h2>
                <T>Audio level</T>
              </h2>
              <p>
                <T>
                  Adjust the audio level until this sound is comfortably
                  audible.
                </T>
              </p>
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
              <h2>
                <T>Headphones positioning</T>
              </h2>
              <p>
                <T>Check the headphones positioning.</T>
              </p>
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
              <p>
                <T>
                  Please do not change/modify the audio level during the test.
                </T>
              </p>
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
