import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../core/redux'
import { QuizPage } from '../pages/QuizPage/QuizPage'

export const App = () => {
  return (
    <Provider store={store}>
      <QuizPage />
    </Provider>
  )
}
