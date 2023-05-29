import {createContext, useReducer} from "react";
import {}
import {shuffleAnswers, normalizeQuestions } from "../helpers";
type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

type InitialStateType = {
    currentQuestionIndex: number;
    questions: Question[];
    showResults: boolean;
    answers: string[];
    currentAnswer: string;
    correctAnswersCount: number;
}
const initialState: InitialStateType = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    currentAnswer: "",
    correctAnswersCount: 0,
}
type ActionPointsType = 'SELECT_ANSWER' | 'NEXT_QUESTION' | 'RESTART' | 'LOADED_QUESTIONS';
enum ActionPoints {
    SELECT_ANSWER = "SELECT_ANSWER",
    NEXT_QUESTION = "NEXT_QUESTION",
    RESTART = "RESTART",
    LOADED_QUESTIONS = "LOADED_QUESTIONS",
}

type ActionType = {
    type: ActionPoints.SELECT_ANSWER;
    payload: string;
} | {
    type: ActionPoints.NEXT_QUESTION | ActionPoints.RESTART | ActionPoints.LOADED_QUESTIONS;
    payload: InitialStateType;
} ;
const reducer = (state:InitialStateType, action: ActionType ): InitialStateType => {
    switch (action.type) {
        case "SELECT_ANSWER": {
            const correctAnswersCount =
                action.payload ===
                state.questions[state.currentQuestionIndex].correctAnswer
                    ? state.correctAnswersCount + 1
                    : state.correctAnswersCount;
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount,
            };
        }
        case "NEXT_QUESTION": {
            const showResults =
                state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults
                ? state.currentQuestionIndex
                : state.currentQuestionIndex + 1;
            const answers = showResults
                ? []
                : shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: "",
            };
        }
        case "RESTART": {
            return initialState;
        }
        case "LOADED_QUESTIONS": {
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0]),
            };
        }
        default: {
            return state;
        }
    }
};
let value;
export const QuizContext = createContext(value);

export const QuizProvider = ({ children}:{ children: JSX.Element}) => {
    value =  useReducer(reducer, initialState);

    if (value){
        const [state,dispatch] = value;
        return(
            <QuizContext.Provider value={state}>{children}</QuizContext.Provider>
        );
    }

};