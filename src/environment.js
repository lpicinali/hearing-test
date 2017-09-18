/* global window */
import qs from 'qs'

import { AppEnvironment } from 'src/constants.js'

function getEnv(envVariable) {
  let appEnv

  switch (envVariable) {
    case AppEnvironment.PRODUCTION:
      appEnv = AppEnvironment.PRODUCTION
      break
    case AppEnvironment.STAGE:
      appEnv = AppEnvironment.STAGE
      break
    case AppEnvironment.DEVELOPMENT:
    default:
      appEnv = AppEnvironment.DEVELOPMENT
      break
  }

  return appEnv
}

const environment = getEnv(process.env.APP_ENV)
export default environment

export const mayOutputDebugInfo = () =>
  environment === AppEnvironment.DEVELOPMENT ||
  (environment !== AppEnvironment.PRODUCTION &&
    qs.parse(window.location.search.replace(/^\?/, '')).debug === '1')
