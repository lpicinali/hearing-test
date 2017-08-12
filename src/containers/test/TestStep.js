import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { AppUrl, Ear } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'
import RenderAfter from 'src/components/RenderAfter.js'
import EarTestContainer from 'src/containers/test/EarTestContainer.js'

const TestUrl = {
  LEFT_EAR: `${AppUrl.TEST}/left-ear`,
  RIGHT_EAR: `${AppUrl.TEST}/right-ear`,
}

/**
 * Test Step
 */
class TestStep extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const { history } = this.props

    return (
      <div className="TestStep">
        <Switch>
          <Route
            exact
            path={TestUrl.LEFT_EAR}
            render={() =>
              <div>
                <h1>{`Let's start testing your left ear`}</h1>

                <EarTestContainer
                  ear={Ear.LEFT}
                  onFinish={() => history.push(TestUrl.RIGHT_EAR)}
                />
                <LinkButton to={TestUrl.RIGHT_EAR}>Next</LinkButton>
              </div>}
          />
          <Route
            exact
            path={TestUrl.RIGHT_EAR}
            render={() =>
              <RenderAfter delay={10}>
                <div>
                  <h1>{`Let's continue testing your right ear`}</h1>

                  <EarTestContainer
                    ear={Ear.RIGHT}
                    onFinish={() => history.push(AppUrl.RESULTS)}
                  />
                  <LinkButton to={AppUrl.RESULTS}>Next</LinkButton>
                </div>
              </RenderAfter>}
          />
          <Redirect to={TestUrl.LEFT_EAR} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(TestStep)
