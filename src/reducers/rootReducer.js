import { combineReducers } from 'redux-immutable'

import l10nReducer from 'src/reducers/l10n.reducer.js'
import testReducer from 'src/reducers/test.reducer.js'

export default combineReducers({
  l10n: l10nReducer,
  test: testReducer,
})
