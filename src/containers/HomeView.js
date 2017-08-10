import React from 'react'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

export default function CalibrationView() {
  return (
    <h1>
      <T>Hearing Test</T>

      <LinkButton to={AppUrl.CALIBRATION}>Go to Calibration</LinkButton>
    </h1>
  )
}
