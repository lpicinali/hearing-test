function getEnv(envArg) {
  let env = 'development'

  if (envArg === 'stage') {
    env = 'stage'
  } else if (envArg === 'production') {
    env = 'production'
  }

  return env
}

module.exports = getEnv(process.env.APP_ENV)
