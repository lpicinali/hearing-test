import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'
import Header from 'src/components/Header.js'
import CalibrationView from 'src/containers/CalibrationView.js'
import HomeView from 'src/containers/HomeView.js'

export default function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path={AppUrl.HOME} component={HomeView} />
        <Route exact path={AppUrl.CALIBRATION} component={CalibrationView} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </div>
  )
}
