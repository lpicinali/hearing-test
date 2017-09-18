import { min, values } from 'lodash'

export const ActionType = {
  SET_ACCEPT_TERMS: 'SET_ACCEPT_TERMS',
  SET_FREQUENCY_LEVEL: 'SET_FREQUENCY_LEVEL',
  SET_LOCALE: 'SET_LOCALE',
  CALCULATE_AUDIOGRAMS: 'CALCULATE_AUDIOGRAMS',
  SET_RESULT_AUDIOGRAM: 'SET_RESULT_AUDIOGRAM',
  SET_RESULT_CODE: 'SET_RESULT_CODE',
  EMAIL_RESULTS: 'EMAIL_RESULTS',
  EMAIL_RESULTS_SUCCESS: 'EMAIL_RESULTS_SUCCESS',
  EMAIL_RESULTS_ERROR: 'EMAIL_RESULTS_ERROR',
  DOWNLOAD_RESULTS: 'DOWNLOAD_RESULTS',
  DOWNLOAD_RESULTS_SUCCESS: 'DOWNLOAD_RESULTS_SUCCESS',
  DOWNLOAD_RESULTS_ERROR: 'DOWNLOAD_RESULTS_ERROR',
  SET_QUESTIONNAIRE_ANSWER: 'SET_QUESTIONNAIRE_ANSWER',
  SUBMIT_QUESTIONNAIRE: 'SUBMIT_QUESTIONNAIRE',
  SUBMIT_QUESTIONNAIRE_SUCCESS: 'SUBMIT_QUESTIONNAIRE_SUCCESS',
  SUBMIT_QUESTIONNAIRE_ERROR: 'SUBMIT_QUESTIONNAIRE_ERROR',
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
  '125': -90,
  '250': -90,
  '500': -100,
  '1000': -110,
  '2000': -110,
  '4000': -100,
  '8000': -100,
}

export const Locale = {
  EN: 'en',
  ES: 'es',
  IT: 'it',
}

export const QuestionnaireField = {
  ENJOYABLE: 'ENJOYABLE',
  UNDERSTANDABLE: 'UNDERSTANDABLE',
  DULL: 'DULL',
  DIFFICULT_TO_LEARN: 'DIFFICULT_TO_LEARN',
  INFERIOR: 'INFERIOR',
  EXCITING: 'EXCITING',
  INTERESTING: 'INTERESTING',
  PREDICTABLE: 'PREDICTABLE',
  SLOW: 'SLOW',
  CONVENTIONAL: 'CONVENTIONAL',
  SUPPORTIVE: 'SUPPORTIVE',
  BAD: 'BAD',
  EASY: 'EASY',
  PLEASING: 'PLEASING',
  LEADING_EDGE: 'LEADING_EDGE',
  PLEASANT: 'PLEASANT',
  NOT_SECURE: 'NOT_SECURE',
  DEMOTIVATING: 'DEMOTIVATING',
  DOES_NOT_MEET_EXPECTATIONS: 'DOES_NOT_MEET_EXPECTATIONS',
  EFFICIENT: 'EFFICIENT',
  CONFUSING: 'CONFUSING',
  PRACTICAL: 'PRACTICAL',
  CLUTTERED: 'CLUTTERED',
  UNATTRACTIVE: 'UNATTRACTIVE',
  UNFRIENDLY: 'UNFRIENDLY',
  INNOVATIVE: 'INNOVATIVE',
  // - - - - - - - - - - - - - - - - -
  MEETS_REQUIREMENTS: 'MEETS_REQUIREMENTS',
  FRUSTRATING_EXPERIENCE: 'FRUSTRATING_EXPERIENCE',
  EASY_TO_USE: 'EASY_TO_USE',
  TIME_WASTED_CORRECTING: 'TIME_WASTED_CORRECTING',
  // - - - - - - - - - - - - - - - - -
  RECOMMENDATION_LIKELIHOOD: 'RECOMMENDATION_LIKELIHOOD',
}

export const SILENCE = min(values(FrequencyStartVolume))

export const TestDirection = {
  UP: 'UP',
  DOWN: 'DOWN',
}

export const TestExtent = {
  TRIMMED: 'TRIMMED',
  NORMAL: 'NORMAL',
}

export const TestFrequencies = {
  [TestExtent.TRIMMED]: ['125', '500', '2000'],
  [TestExtent.NORMAL]: ['125', '250', '500', '1000', '2000', '4000', '8000'],
}
