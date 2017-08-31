import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { AppUrl } from 'src/constants.js'
import { BLACK, GRAY } from 'src/styles/colors.js'

const StyledDevNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  right: 40px;
  padding: 8px;
  background-color: ${GRAY};
  font-size: 12px;

  & a {
    display: inline-block;
    margin: 0 8px;
    color: ${BLACK};
    text-decoration: none;
  }
`

/**
 * Dev Navigation
 */
class DevNavigation extends Component {
  render() {
    return (
      <StyledDevNavigation className="DevNavigation">
        <NavLink to={AppUrl.HOME}>Home</NavLink>
        <NavLink to={AppUrl.CALIBRATION}>Calibration</NavLink>
        <NavLink to={AppUrl.TEST}>Test</NavLink>
        <NavLink to={AppUrl.RESULTS}>Results</NavLink>
        <NavLink to={AppUrl.QUESTIONNAIRE}>Questionnaire</NavLink>
        <NavLink to={AppUrl.THANK_YOU}>Thank you</NavLink>
      </StyledDevNavigation>
    )
  }
}

export default DevNavigation
