import { combineReducers } from 'redux-immutable'

import testReducer from 'src/reducers/test.reducer.js'

export default combineReducers({
  test: testReducer,
})
