function getEnv(envArg) {
  let env = 'DEVELOPMENT'

  if (envArg === 'STAGE') {
    env = 'STAGE'
  } else if (envArg === 'PRODUCTION') {
    env = 'PRODUCTION'
  }

  return env
}

module.exports = getEnv(process.env.APP_ENV)
