import { AppEnvironment, TestExtent } from 'src/constants.js'
import environment from 'src/environment.js'

const EXTENT =
  process.env.EXTENT === TestExtent.TRIMMED
    ? TestExtent.TRIMMED
    : TestExtent.NORMAL
const HAS_QUESTIONNAIRE = process.env.QUESTIONNAIRE === '1'
const HAS_CODES = process.env.CODES === '1'
const DEV_PDF_HOST = process.env.DEV_PDF_HOST || 'localhost'

const configs = {
  [AppEnvironment.DEVELOPMENT]: {
    siteUrl: 'http://localhost:8263',
    pdfUrl: `http://${DEV_PDF_HOST}:8265/pdf`,
    EXTENT,
    HAS_CODES,
    HAS_QUESTIONNAIRE,
  },
  [AppEnvironment.STAGE]: {
    siteUrl: 'https://hearing-test-stage.herokuapp.com',
    pdfUrl: 'https://hearing-test-stage.herokuapp.com/pdf',
    EXTENT,
    HAS_CODES,
    HAS_QUESTIONNAIRE,
  },
  [AppEnvironment.PRODUCTION]: {
    siteUrl: 'http://hearing-test.3d-tune-in.eu',
    pdfUrl: 'http://hearing-test.3d-tune-in.eu/pdf',
    EXTENT,
    HAS_CODES,
    HAS_QUESTIONNAIRE,
  },
}

export default configs[environment]
