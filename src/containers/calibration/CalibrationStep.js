import React from 'react'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

export default function CalibrationStep() {
  return (
    <h1>
      <T>Calibration</T>

      <LinkButton to={AppUrl.TEST}>Go to Test</LinkButton>
    </h1>
  )
}
