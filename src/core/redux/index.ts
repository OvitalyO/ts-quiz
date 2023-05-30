import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { rootReducer } from './reducer'

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

