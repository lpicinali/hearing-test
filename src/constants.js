import { min, values } from 'lodash'

export const ActionType = {
  SET_ACCEPT_TERMS: 'SET_ACCEPT_TERMS',
  SET_FREQUENCY_LEVEL: 'SET_FREQUENCY_LEVEL',
  SET_LOCALE: 'SET_LOCALE',
  CALCULATE_AUDIOGRAMS: 'CALCULATE_AUDIOGRAMS',
  SET_RESULT_AUDIOGRAM: 'SET_RESULT_AUDIOGRAM',
  SET_RESULT_CODE: 'SET_RESULT_CODE',
  SUBMIT_QUESTIONNAIRE: 'SUBMIT_QUESTIONNAIRE',
}

export const AppEnvironment = {
  DEVELOPMENT: 'DEVELOPMENT',
  STAGE: 'STAGE',
  PRODUCTION: 'PRODUCTION',
}

export const AppUrl = {
  HOME: '/',
  CALIBRATION: '/calibration',
  TEST: '/test',
  RESULTS: '/results',
  QUESTIONNAIRE: '/questionnaire',
  THANK_YOU: '/thank-you',
}

export const Ear = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

export const FrequencyStartVolume = {
  '125': -70,
  '250': -70,
  '500': -70,
  '1000': -80,
  '2000': -90,
  '4000': -80,
  '8000': -70,
}

export const Locale = {
  EN: 'en-GB',
  ES: 'es-ES',
  IT: 'it-IT',
}

export const SILENCE = min(values(FrequencyStartVolume))

export const TestDirection = {
  UP: 'UP',
  DOWN: 'DOWN',
}

export const TEST_FREQUENCIES = [
  '125',
  '250',
  '500',
  '1000',
  '2000',
  '4000',
  '8000',
]
