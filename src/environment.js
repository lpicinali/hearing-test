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

export default getEnv(process.env.APP_ENV)
