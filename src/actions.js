import { ActionType } from 'src/constants.js'

export const setFrequencyLevel = (ear, frequency, direction, level) => ({
  type: ActionType.SET_FREQUENCY_LEVEL,
  payload: { ear, frequency, direction, level },
})

export const setLocale = locale => ({
  type: ActionType.SET_LOCALE,
  payload: { locale },
})

export const calculateAudiograms = () => ({
  type: ActionType.CALCULATE_AUDIOGRAMS,
})

export const setResultAudiogram = (ear, audiogram) => ({
  type: ActionType.SET_RESULT_AUDIOGRAM,
  payload: { ear, audiogram },
})

export const setResultCode = (ear, code) => ({
  type: ActionType.SET_RESULT_CODE,
  payload: { ear, code },
})
