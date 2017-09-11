/* global document */
/* eslint react/no-children-prop: 0 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { values } from 'lodash'
import { lifecycle } from 'recompose'
import scrollTo from 'animated-scrollto'

import { AppUrl } from 'src/constants.js'
import { mayOutputDebugInfo } from 'src/environment.js'
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

const createScrollToTopView = lifecycle({
  componentDidMount: () => scrollTo(document.body, 0, 500),
})

const createRouteView = ViewComponent => {
  const ScrollTopViewComponent = createScrollToTopView(ViewComponent)
  return ({ match, ...rest }) => (
    <RouteTransition
      component={ScrollTopViewComponent}
      match={match}
      {...rest}
    />
  )
}

const HomeRouteView = createRouteView(HomeView)
const CalibrationRouteView = createRouteView(CalibrationStep)
const TestRouteView = createRouteView(TestStep)
const ResultsRouteView = createRouteView(ResultsStep)
const QuestionnaireRouteView = createRouteView(QuestionnaireStep)
const EndRouteView = createRouteView(EndView)

export default function App() {
  return (
    <AppRoot>
      <Header />

      <MainContent>
        <Switch>
          <Route
            path={`(${values(AppUrl).join('|')})`}
            render={() => (
              <div>
                <Route exact path={AppUrl.HOME} children={HomeRouteView} />
                <Route
                  path={`${AppUrl.CALIBRATION}/:step?`}
                  children={CalibrationRouteView}
                />
                <Route path={AppUrl.TEST} children={TestRouteView} />
                <Route path={AppUrl.RESULTS} children={ResultsRouteView} />
                <Route
                  path={AppUrl.QUESTIONNAIRE}
                  children={QuestionnaireRouteView}
                />
                <Route path={AppUrl.THANK_YOU} children={EndRouteView} />
              </div>
            )}
          />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </MainContent>

      {mayOutputDebugInfo() && <DevNavigation />}
    </AppRoot>
  )
}
