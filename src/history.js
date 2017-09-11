import { createBrowserHistory, createMemoryHistory } from 'history'

import { AppEnvironment } from 'src/constants.js'
import environment from 'src/environment.js'

const history =
  environment === AppEnvironment.DEVELOPMENT
    ? createBrowserHistory()
    : createMemoryHistory()

export default history
