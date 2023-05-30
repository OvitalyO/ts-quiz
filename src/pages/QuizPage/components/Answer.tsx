import { memo } from 'react'

export interface AnswerProps {
  answerText: string
  onSelectAnswer: (answer: string) => void
  index: number
  currentAnswer: string
  correctAnswer: string
}

export const Answer = memo((props: AnswerProps) => {

  const {
    answerText,
    onSelectAnswer,
    index,
    correctAnswer,
    currentAnswer
  } = props

  const letterMapping = ["A", "B", "C", "D"];
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answerText && currentAnswer !== correctAnswer;
  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = currentAnswer ? "disabled-answer" : "";


  return (
    <div
      className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className="answer-letter">{letterMapping[index]}</div>
      <div className="answer-text">{answerText}</div>
    </div>
  )
})
