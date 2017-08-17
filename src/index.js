/* global document */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from 'src/containers/AppContainer.js'

ReactDOM.render(<AppContainer />, document.querySelector('#app-root'))
