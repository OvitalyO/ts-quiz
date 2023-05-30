import { memo, useCallback, useEffect } from 'react'
import { useAppSelector } from '../../../core/hooks/useAppSelector'
import { Question } from './Question'
import { useActions } from '../../../core/hooks/useActions'

export const Quiz = memo(() => {
  const quizState = useAppSelector(state => state.quiz)

  const { restart, nextQuestion, fetchQuestions } = useActions()

  const onClickRestart = useCallback(() => {
    restart()
  }, [])

  const onClickNext = useCallback(() => {
    nextQuestion()
  }, [])

  useEffect(() => {
    fetchQuestions()
    console.log('quizState ', quizState)
  }, [])

  if (quizState.isLoading) {
    return (
      <div className="quiz">
        Loading...
      </div>
    )
  }

  if (!quizState.questions) {
    return (
      <div className="quiz">
        Вопросов нет
      </div>
    )
  }

  if (quizState.showResults) {
    return (
      <div className="quiz">
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You've got {quizState.correctAnswersCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div className="next-button" onClick={onClickRestart}>
            Restart
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div>
        <div className="score">
          Question {quizState.currentQuestionIndex + 1}/
          {quizState.questions.length}
        </div>
        <Question />
        <div
          className="next-button"
          onClick={onClickNext}
        >
          Next question
        </div>
      </div>
    </div>
  )
})

