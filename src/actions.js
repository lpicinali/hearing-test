import { ActionType } from 'src/constants.js'

export const setAcceptTerms = isAccepting => ({
  type: ActionType.SET_ACCEPT_TERMS,
  payload: { isAccepting },
})

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

export const emailResults = ({ recipient, results }) => ({
  type: ActionType.EMAIL_RESULTS,
  payload: { recipient, results },
})

export const emailResultsSuccess = () => ({
  type: ActionType.EMAIL_RESULTS_SUCCESS,
})

export const emailResultsError = error => ({
  type: ActionType.EMAIL_RESULTS_ERROR,
  error,
})

export const downloadResults = () => ({
  type: ActionType.DOWNLOAD_RESULTS,
})

export const setQuestionnaireAnswer = (name, value) => ({
  type: ActionType.SET_QUESTIONNAIRE_ANSWER,
  payload: { name, value },
})

export const submitQuestionnaire = values => ({
  type: ActionType.SUBMIT_QUESTIONNAIRE,
  payload: { values },
})

export const submitQuestionnaireSuccess = () => ({
  type: ActionType.SUBMIT_QUESTIONNAIRE_SUCCESS,
})

export const submitQuestionnaireError = error => ({
  type: ActionType.SUBMIT_QUESTIONNAIRE_ERROR,
  error,
})
