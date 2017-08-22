import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { T } from 'lioness'

import { calculateAudiograms } from 'src/actions.js'
import { AppUrl, Ear } from 'src/constants.js'
import RenderAfter from 'src/components/RenderAfter.js'
import EarTestContainer from 'src/containers/test/EarTestContainer.js'
import { H2 } from 'src/styles/elements.js'

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
        <H2>
          <T>Testing your hearing</T>
        </H2>

        <Switch>
          <Route
            exact
            path={TestUrl.LEFT_EAR}
            render={() =>
              <div>
                <EarTestContainer
                  ear={Ear.LEFT}
                  onFinish={() => history.push(TestUrl.RIGHT_EAR)}
                />
              </div>}
          />
          <Route
            exact
            path={TestUrl.RIGHT_EAR}
            render={() =>
              <RenderAfter delay={10}>
                <div>
                  <EarTestContainer ear={Ear.RIGHT} onFinish={onFinishTests} />
                </div>
              </RenderAfter>}
          />
          <Redirect to={TestUrl.LEFT_EAR} />
        </Switch>

        <button onClick={onFinishTests}>Finish early</button>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  onFinishTests: () => dispatch(calculateAudiograms()),
}))(withRouter(TestStep))
