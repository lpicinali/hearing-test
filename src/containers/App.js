import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppUrl, AppEnvironment } from 'src/constants.js'
import environment from 'src/environment.js'
import Header from 'src/components/Header.js'
import HomeView from 'src/containers/HomeView.js'
import EndView from 'src/containers/EndView.js'
import DevNavigation from 'src/containers/DevNavigation.js'
import CalibrationStep from 'src/containers/calibration/CalibrationStep.js'
import ResultsStep from 'src/containers/results/ResultsStep.js'
import TestStep from 'src/containers/test/TestStep.js'

export default function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path={AppUrl.HOME} component={HomeView} />
        <Route path={AppUrl.CALIBRATION} component={CalibrationStep} />
        <Route path={AppUrl.TEST} component={TestStep} />
        <Route path={AppUrl.RESULTS} component={ResultsStep} />
        <Route path={AppUrl.THANK_YOU} component={EndView} />
        <Route render={() => <h1>404</h1>} />
      </Switch>

      {environment !== AppEnvironment.PRODUCTION && <DevNavigation />}
    </div>
  )
}
