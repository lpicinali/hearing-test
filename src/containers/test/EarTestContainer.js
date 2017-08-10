import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'

import { Ear } from 'src/constants.js'

/**
 * Ear Test Container
 */
class EarTestContainer extends Component {
  static propTypes = {
    ear: PropTypes.oneOf(values(Ear)).isRequired,
  }

  render() {
    const { ear } = this.props

    return (
      <div className="EarTestContainer">
        Ear test: {ear}
      </div>
    )
  }
}

export default EarTestContainer
