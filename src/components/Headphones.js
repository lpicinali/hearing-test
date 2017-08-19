import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'
import styled from 'styled-components'

import { Ear } from 'src/constants.js'
import { GRAY, YELLOW, WHITE } from 'src/styles/colors.js'

function getColorForEar(ear, activeEar) {
  if (activeEar === null || ear === activeEar) {
    return YELLOW
  }
  return WHITE
}

const AnimatingPath = styled.path`
  fill: ${props => getColorForEar(props.ear, props.activeEar)};
  transition: fill 0.3s;
`

/**
 * Headphones
 */
class Headphones extends Component {
  static propTypes = {
    activeEar: PropTypes.oneOf(values(Ear)).isRequired,
  }

  render() {
    const { activeEar } = this.props

    return (
      <div className="Headphones">
        <svg width="90px" height="90px" viewBox="0 0 90 90">
          <path
            fill={GRAY}
            d="M4.73684211,73.625 L4.73684211,45.1249997 C4.73684244,22.826503 22.7632722,4.75 45,4.75 C67.2367278,4.75 85.2631576,22.826503 85.2631579,45.1249998 L85.2631579,73.625 C85.2631579,74.9366763 86.3235361,76 87.6315789,76 C88.9396218,76 90,74.9366763 90,73.625 L90,45.1249997 C89.9999996,20.2031504 69.8528135,4.48252546e-15 45,0 C20.1471865,-2.10942375e-15 3.70335785e-07,20.2031504 5.25895117e-16,45.1249997 L0,73.625 C0,74.9366763 1.06037822,76 2.36842105,76 C3.67646388,76 4.73684211,74.9366763 4.73684211,73.625 Z"
          />
          <AnimatingPath
            ear={Ear.LEFT}
            activeEar={activeEar}
            d="M0,78.125 L0,54.375 C0,53.0633237 1.04466892,52 2.33333333,52 L16.3333333,52 C22.7766554,52 28,57.3166186 28,63.875 L28,78.125 C28,84.6833814 22.7766554,90 16.3333333,90 L11.6666667,90 C5.22334459,90 0,84.6833814 0,78.125 Z M4.66666667,78.125 C4.66666667,82.0600288 7.80067342,85.25 11.6666667,85.25 L16.3333333,85.25 C20.1993266,85.25 23.3333333,82.0600288 23.3333333,78.125 L23.3333333,63.875 C23.3333333,59.9399712 20.1993266,56.75 16.3333333,56.75 L4.66666667,56.75 L4.66666667,78.125 Z"
          />
          <AnimatingPath
            ear={Ear.RIGHT}
            activeEar={activeEar}
            d="M73.6666667,56.75 C69.8006734,56.75 66.6666667,59.9399712 66.6666667,63.875 L66.6666667,78.125 C66.6666667,82.0600288 69.8006734,85.25 73.6666667,85.25 L78.3333333,85.25 C82.1993266,85.25 85.3333333,82.0600288 85.3333333,78.125 L85.3333333,56.75 L73.6666667,56.75 Z M90,78.125 C90,84.6833814 84.7766554,90 78.3333333,90 L73.6666667,90 C67.2233446,90 62,84.6833814 62,78.125 L62,63.875 C62,57.3166186 67.2233446,52 73.6666667,52 L87.6666667,52 C88.9553311,52 90,53.0633237 90,54.375 L90,78.125 Z"
          />
        </svg>
      </div>
    )
  }
}

export default Headphones
