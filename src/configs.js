import { AppEnvironment } from 'src/constants.js'
import environment from 'src/environment.js'

const configs = {
  [AppEnvironment.DEVELOPMENT]: {
    siteUrl: 'http://localhost:8263',
  },
  [AppEnvironment.STAGE]: {
    siteUrl: 'http://hearing-test-stage.herokuapp.com',
  },
  [AppEnvironment.PRODUCTION]: {
    siteUrl: 'http://hearing-test.3d-tune-in.eu',
  },
}

export default configs[environment]
