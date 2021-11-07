import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import projectsReducer from './reducers/projectsReducer'

const rootReducer = combineReducers({
  projects: projectsReducer,
  user: authReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
