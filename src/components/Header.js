import React from 'react'
import { Link } from 'react-router-dom'

import { AppUrl } from 'src/constants.js'

export default function Header() {
  return (
    <header>
      3D Tune-In Hearing Test
      <nav>
        <Link to={AppUrl.HOME}>Home</Link>
        <Link to={AppUrl.CALIBRATION}>Calibration</Link>
      </nav>
    </header>
  )
}
