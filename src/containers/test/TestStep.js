import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AppUrl, Ear } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import EarTestContainer from 'src/containers/test/EarTestContainer.js'

const TestUrl = {
  LEFT_EAR: `${AppUrl.TEST}/left-ear`,
  RIGHT_EAR: `${AppUrl.TEST}/right-ear`,
}

/**
 * Test Step
 */
class TestStep extends Component {
  render() {
    return (
      <div className="TestStep">
        <Switch>
          <Route
            exact
            path={TestUrl.LEFT_EAR}
            render={() =>
              <div>
                <h1>{`Let's start testing your left ear`}</h1>

                <EarTestContainer ear={Ear.LEFT} />
                <LinkButton to={TestUrl.RIGHT_EAR}>Next</LinkButton>
              </div>}
          />
          <Route
            exact
            path={TestUrl.RIGHT_EAR}
            render={() =>
              <div>
                <h1>{`Let's continue testing your right ear`}</h1>

                <EarTestContainer ear={Ear.RIGHT} />
                <LinkButton to={AppUrl.RESULTS}>Next</LinkButton>
              </div>}
          />
          <Redirect to={TestUrl.LEFT_EAR} />
        </Switch>
      </div>
    )
  }
}

export default TestStep
