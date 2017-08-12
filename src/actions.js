import { ActionType } from 'src/constants.js'

export const setFrequencyLevel = (ear, frequency, direction, level) => ({
  type: ActionType.SET_FREQUENCY_LEVEL,
  payload: { ear, frequency, direction, level },
})

export const setLocale = locale => ({
  type: ActionType.SET_LOCALE,
  payload: { locale },
})
