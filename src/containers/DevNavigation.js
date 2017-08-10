import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'

/**
 * Dev Navigation
 */
class DevNavigation extends Component {
  render() {
    return (
      <nav className="DevNavigation">
        <NavLink to={AppUrl.HOME}>Home</NavLink>
        <NavLink to={AppUrl.CALIBRATION}>Calibration</NavLink>
        <NavLink to={AppUrl.TEST}>Test</NavLink>
        <NavLink to={AppUrl.RESULTS}>Results</NavLink>
        <NavLink to={AppUrl.THANK_YOU}>Thank you</NavLink>
      </nav>
    )
  }
}

export default DevNavigation
