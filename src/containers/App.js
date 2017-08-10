import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import Header from 'src/components/Header.js'
import HomeView from 'src/containers/HomeView.js'
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
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </div>
  )
}
