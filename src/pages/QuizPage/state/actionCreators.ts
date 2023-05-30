import { AppDispatch, RootState } from '../../../core/redux'
import { API_END } from '../../../config/api'
import { Question } from '../../../core/interfaces/Quiz'
import { $api } from '../../../core/utils/apiClient'
import { QuizActionEnum } from './types'

const {
  QUESTIONS_PENDING,
  QUESTIONS_SUCCESS,
  QUESTIONS_ERROR,
  ANSWER_SELECTED,
  QUESTION_NEXT,
  RESTART
} = QuizActionEnum

interface BackendQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface FetchQuestionsResponse {
  response_code: number
  results: BackendQuestion[]
}

export const fetchQuestions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: QUESTIONS_PENDING })

      const res = await $api.get<FetchQuestionsResponse>(API_END.MAIN, {
        params: {
          amount: 10,
          category: 31,
          difficulty: 'easy',
          type: 'multiple',
          encode: 'url3986'
        }
      })
      console.log('res ', res)

      const questions = normalizeQuestions(res.data.results)
      const answers = shuffleAnswers(questions[0])

      dispatch({ type: QUESTIONS_SUCCESS, questions, answers  })

    } catch (e) {
      dispatch({ type: QUESTIONS_ERROR, error: 'Произошла ошибка при загрузке данных' })
    }
  }
}

export const selectAnswer = (currentAnswer: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {

    const quizState = getState().quiz
    console.log('quizState ', quizState)

    const correctAnswersCount = currentAnswer === quizState.questions[quizState.currentQuestionIndex].correctAnswer
      ? quizState.correctAnswersCount + 1
      : quizState.correctAnswersCount

      dispatch({ type: ANSWER_SELECTED, currentAnswer, correctAnswersCount })
  }
}

export const nextQuestion = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    const quizState = getState().quiz

    const showResults = quizState.currentQuestionIndex === quizState.questions.length - 1

    const currentQuestionIndex = showResults
      ? quizState.currentQuestionIndex
      : quizState.currentQuestionIndex + 1

    const answers = showResults ? [] : shuffleAnswers(quizState.questions[currentQuestionIndex]);

    dispatch({ type: QUESTION_NEXT, showResults, currentQuestionIndex, answers, currentAnswer: '' })
  }
}

export const restart = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: RESTART })
  }
}


function normalizeQuestions(backendQuestions: BackendQuestion[]): Question[] {
  return backendQuestions.map((backendQuestion) => {
    const incorrectAnswers = backendQuestion.incorrect_answers.map(
      (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
    )
    return {
      ...backendQuestion,
      correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
      question: decodeURIComponent(backendQuestion.question),
      incorrectAnswers
    }
  })
}

function shuffleAnswers(question: Question): string[] {
  const unshuffledAnswers: string[] = [
    // правильный ответ
    question.correctAnswer,
    ...question.incorrectAnswers
  ]

  // превращаем массив строк в массив объектов
  return unshuffledAnswers
    .map((unshuffledAnswer) => ({
      sort: Math.random(),
      value: unshuffledAnswer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
}
