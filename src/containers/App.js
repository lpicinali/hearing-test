/* eslint react/no-children-prop: 0 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { values } from 'lodash'

import { AppUrl, AppEnvironment } from 'src/constants.js'
import environment, { mayOutputDebugInfo } from 'src/environment.js'
import Header from 'src/components/Header.js'
import RouteTransition from 'src/components/RouteTransition.js'
import HomeView from 'src/containers/HomeView.js'
import EndView from 'src/containers/EndView.js'
import DevNavigation from 'src/containers/DevNavigation.js'
import CalibrationStep from 'src/containers/calibration/CalibrationStep.js'
import QuestionnaireStep from 'src/containers/QuestionnaireStep.js'
import ResultsStep from 'src/containers/results/ResultsStep.js'
import TestStep from 'src/containers/test/TestStep.js'

import 'src/styles/global.js'

const AppRoot = styled.div``

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
          <Route
            path={`(${values(AppUrl).join('|')})`}
            render={() =>
              <div>
                <Route
                  exact
                  path={AppUrl.HOME}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={HomeView}
                      match={match}
                      {...rest}
                    />}
                />
                <Route
                  path={`${AppUrl.CALIBRATION}/:step?`}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={CalibrationStep}
                      match={match}
                      {...rest}
                    />}
                />
                <Route
                  path={AppUrl.TEST}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={TestStep}
                      match={match}
                      {...rest}
                    />}
                />
                <Route
                  path={AppUrl.RESULTS}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={ResultsStep}
                      match={match}
                      {...rest}
                    />}
                />
                <Route
                  path={AppUrl.QUESTIONNAIRE}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={QuestionnaireStep}
                      match={match}
                      {...rest}
                    />}
                />
                <Route
                  path={AppUrl.THANK_YOU}
                  children={({ match, ...rest }) =>
                    <RouteTransition
                      component={EndView}
                      match={match}
                      {...rest}
                    />}
                />
              </div>}
          />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </MainContent>

      {mayOutputDebugInfo() && <DevNavigation />}
    </AppRoot>
  )
}
