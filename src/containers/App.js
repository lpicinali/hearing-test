import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { AppUrl, AppEnvironment } from 'src/constants.js'
import environment from 'src/environment.js'
import Header from 'src/components/Header.js'
import HomeView from 'src/containers/HomeView.js'
import EndView from 'src/containers/EndView.js'
import DevNavigation from 'src/containers/DevNavigation.js'
import CalibrationStep from 'src/containers/calibration/CalibrationStep.js'
import ResultsStep from 'src/containers/results/ResultsStep.js'
import TestStep from 'src/containers/test/TestStep.js'

const AppRoot = styled.div`
  font-family: sans-serif;
  line-height: 1.5;
`

const MainContent = styled.main`
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 0 80px;
`

export default function App() {
  return (
    <AppRoot>
      <Header />

      <MainContent>
        <Switch>
          <Route exact path={AppUrl.HOME} component={HomeView} />
          <Route path={AppUrl.CALIBRATION} component={CalibrationStep} />
          <Route path={AppUrl.TEST} component={TestStep} />
          <Route path={AppUrl.RESULTS} component={ResultsStep} />
          <Route path={AppUrl.THANK_YOU} component={EndView} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </MainContent>

      {environment !== AppEnvironment.PRODUCTION && <DevNavigation />}
    </AppRoot>
  )
}
