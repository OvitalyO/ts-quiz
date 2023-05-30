import { memo } from 'react'
import { Quiz } from './components/Quiz'

export const QuizPage = memo(() => {

  return (
    <div className="page">
      <Quiz />
    </div>
  )
})
