import React from 'react'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

export default function CalibrationView() {
  return (
    <h1>
      <T>Calibration</T>

      <LinkButton to={AppUrl.HOME}>Go to Home</LinkButton>
    </h1>
  )
}
