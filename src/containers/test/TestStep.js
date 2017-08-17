import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { T } from 'lioness'

import { calculateAudiograms } from 'src/actions.js'
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
    onFinishTests: PropTypes.func.isRequired,
  }

  render() {
    const { history, onFinishTests } = this.props

    return (
      <div className="TestStep">
        <Switch>
          <Route
            exact
            path={TestUrl.LEFT_EAR}
            render={() =>
              <div>
                <h1>
                  <T>{`Let's start testing your left ear`}</T>
                </h1>

                <EarTestContainer
                  ear={Ear.LEFT}
                  onFinish={() => history.push(TestUrl.RIGHT_EAR)}
                />
                <LinkButton to={TestUrl.RIGHT_EAR}>
                  <T>Next</T>
                </LinkButton>
              </div>}
          />
          <Route
            exact
            path={TestUrl.RIGHT_EAR}
            render={() =>
              <RenderAfter delay={10}>
                <div>
                  <h1>
                    <T>{`Let's continue testing your right ear`}</T>
                  </h1>

                  <EarTestContainer ear={Ear.RIGHT} onFinish={onFinishTests} />
                  <LinkButton to={AppUrl.RESULTS}>
                    <T>Next</T>
                  </LinkButton>
                </div>
              </RenderAfter>}
          />
          <Redirect to={TestUrl.LEFT_EAR} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  onFinishTests: () => dispatch(calculateAudiograms()),
}))(withRouter(TestStep))
