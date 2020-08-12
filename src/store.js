import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rooterReducer from './redux'

export default createStore(
  rooterReducer,
  applyMiddleware(thunk)
)

