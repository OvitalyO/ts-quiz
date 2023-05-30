import { combineReducers } from 'redux'
import { quizReducer } from '../../pages/QuizPage/state/reducer'

export const rootReducer = combineReducers({
  quiz: quizReducer
})
