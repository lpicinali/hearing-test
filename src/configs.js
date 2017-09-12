import { AppEnvironment, TestExtent } from 'src/constants.js'
import environment from 'src/environment.js'

const EXTENT =
  process.env.EXTENT === TestExtent.TRIMMED
    ? TestExtent.TRIMMED
    : TestExtent.NORMAL

const HAS_QUESTIONNAIRE = process.env.QUESTIONNAIRE === '1'

const configs = {
  [AppEnvironment.DEVELOPMENT]: {
    siteUrl: 'http://localhost:8263',
    apiUrl: 'http://localhost:8264/api',
    EXTENT,
    HAS_QUESTIONNAIRE,
  },
  [AppEnvironment.STAGE]: {
    siteUrl: 'https://hearing-test-stage.herokuapp.com',
    apiUrl: 'https://hearing-test-stage.herokuapp.com/api',
    EXTENT,
    HAS_QUESTIONNAIRE,
  },
  [AppEnvironment.PRODUCTION]: {
    siteUrl: 'http://hearing-test.3d-tune-in.eu',
    apiUrl: 'http://hearing-test.3d-tune-in.eu/api',
    EXTENT,
    HAS_QUESTIONNAIRE,
  },
}

export default configs[environment]
