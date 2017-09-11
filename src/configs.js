import { AppEnvironment } from 'src/constants.js'
import environment from 'src/environment.js'

const configs = {
  [AppEnvironment.DEVELOPMENT]: {
    siteUrl: 'http://localhost:8263',
    apiUrl: 'http://localhost:8264/api',
  },
  [AppEnvironment.STAGE]: {
    siteUrl: 'https://hearing-test-stage.herokuapp.com',
    apiUrl: 'https://hearing-test-stage.herokuapp.com/api',
  },
  [AppEnvironment.PRODUCTION]: {
    siteUrl: 'http://hearing-test.3d-tune-in.eu',
    apiUrl: 'http://hearing-test.3d-tune-in.eu/api',
  },
}

export default configs[environment]
