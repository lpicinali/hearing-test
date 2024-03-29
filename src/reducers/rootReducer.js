import { combineReducers } from 'redux-immutable'

import l10nReducer from 'src/reducers/l10n.reducer.js'
import questionnaireReducer from 'src/reducers/questionnaire.reducer.js'
import resultsReducer from 'src/reducers/results.reducer.js'
import termsReducer from 'src/reducers/terms.reducer.js'
import testReducer from 'src/reducers/test.reducer.js'

export default combineReducers({
  l10n: l10nReducer,
  questionnaire: questionnaireReducer,
  results: resultsReducer,
  terms: termsReducer,
  test: testReducer,
})
