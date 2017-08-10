import React from 'react'
import { Link } from 'react-router-dom'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'

export default function Header() {
  return (
    <header>
      <T>3D Tune-In Hearing Test</T>
      <nav>
        <Link to={AppUrl.HOME}>
          <T>Home</T>
        </Link>
        <Link to={AppUrl.CALIBRATION}>
          <T>Calibration</T>
        </Link>
      </nav>
    </header>
  )
}
