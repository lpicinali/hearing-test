import React from 'react'
import { T } from 'lioness'

import LocalePicker from 'src/containers/LocalePicker.js'

export default function Header() {
  return (
    <header>
      <T>3D Tune-In Hearing Test</T>

      <LocalePicker />
    </header>
  )
}
