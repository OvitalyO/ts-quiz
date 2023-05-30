import { QuizAction, QuizActionEnum, QuizState } from './types'

const initialState: QuizState = {
  isLoading: false,
  questions: [],
  error: '',
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: '',
  correctAnswersCount: 0
}

// Изза деструктуризации не получится использовать const enum
// Как вариант можно делать так
const {
  QUESTIONS_PENDING,
  QUESTIONS_SUCCESS,
  QUESTIONS_ERROR,
  ANSWER_SELECTED,
  QUESTION_NEXT,
  RESTART
} = QuizActionEnum

// Типы action.type описаны в QuizActionEnum
// Типы всех actions = QuizAction

export const quizReducer = (state = initialState, action: QuizAction): QuizState => {
  // TypeScript сам подхватывает все типы action.type
  // Нам остается перебрать case для каждого type
  switch (action.type) {
    case QUESTIONS_PENDING:
      return { ...state, isLoading: true }
    case QUESTIONS_SUCCESS:
      return { ...state, questions: action.questions, answers: action.answers, isLoading: false }
    case QUESTIONS_ERROR:
      return { ...state, error: action.error, isLoading: false }
    case ANSWER_SELECTED:
      return { ...state, currentAnswer: action.currentAnswer, correctAnswersCount: action.correctAnswersCount }
    case QUESTION_NEXT:
      return { ...state, currentQuestionIndex: action.currentQuestionIndex, showResults: action.showResults, answers: action.answers, currentAnswer: action.currentAnswer }
    case RESTART:
      return initialState
    default:
      return state
    }
}
