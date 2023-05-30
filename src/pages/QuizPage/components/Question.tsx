import { memo, useCallback } from 'react'
import { useAppSelector } from '../../../core/hooks/useAppSelector'
import { useActions } from '../../../core/hooks/useActions'
import { Answer } from './Answer'

export const Question = memo(() => {

  const quizState = useAppSelector(state => state.quiz)
  const { selectAnswer } = useActions()


  const currentQuestion = quizState?.questions[quizState.currentQuestionIndex]

  const onClickAnswer = useCallback((answer: string) => {
    console.log('onClickAnswer onClickAnsweronClickAnsweronClickAnswer')
    selectAnswer(answer)
  }, [])

  if (!currentQuestion) {
    return (
      <div>
        Error
      </div>
    )
  }

  return (
      <div>
          <div className="question">{currentQuestion.question}</div>
          <div className="answers">
              {quizState.answers.map((answer, index) => (
                  <Answer
                      answerText={answer}
                      key={index}
                      index={index}
                      currentAnswer={quizState.currentAnswer}
                      correctAnswer={currentQuestion.correctAnswer}
                      onSelectAnswer={onClickAnswer}
                  />
              ))}
          </div>
      </div>
  )
})
