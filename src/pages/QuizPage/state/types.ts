import { Question } from '../../../core/interfaces/Quiz'

// Состояние
export interface QuizState {
  isLoading: boolean
  questions: Question[]
  error: string
  currentQuestionIndex: number
  showResults: boolean
  answers: string[]
  currentAnswer: string
  correctAnswersCount: number
}

// Все виды actions
export enum QuizActionEnum {
  QUESTIONS_PENDING = 'QUESTIONS_PENDING',
  QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS',
  QUESTIONS_ERROR = 'QUESTIONS_ERROR',
  ANSWER_SELECTED = 'ANSWER_SELECTED',
  QUESTION_NEXT = 'QUESTION_NEXT',
  RESTART = 'RESTART'
}

// Описываем каждый action

export interface QuestionsPendingAction {
  type: QuizActionEnum.QUESTIONS_PENDING
}

export interface QuestionsSuccessAction {
  type: QuizActionEnum.QUESTIONS_SUCCESS
  questions: Question[]
  answers: string[]
}

export interface QuestionsErrorAction {
  type: QuizActionEnum.QUESTIONS_ERROR
  error: string
}

export interface AnswerSelectedAction {
  type: QuizActionEnum.ANSWER_SELECTED
  currentAnswer: string
  correctAnswersCount: number
}

export interface QuestionNextAction {
  type: QuizActionEnum.QUESTION_NEXT
  currentQuestionIndex: number
  showResults: boolean
  answers: any[]
  currentAnswer: string
}

export interface RestartAction {
  type: QuizActionEnum.RESTART
}

// Собираем все описания actions в один тип, чтобы использовать в reducer
export type QuizAction =
  QuestionsPendingAction |
  QuestionsSuccessAction |
  QuestionsErrorAction |
  AnswerSelectedAction |
  QuestionNextAction |
  RestartAction

