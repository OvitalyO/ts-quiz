import {createContext, useReducer} from "react";
import data from "../data";

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    showResults: false,
}

const reducer = (state: any, action: any) =>{
    console.log('reducer', state, action);
    if (action.type === "NEXT_QUESTION"){
        const showResults = state.currentQuestionIndex === state.questions.length - 1;
        const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
        return {
            ...state,
            currentQuestionIndex,
            showResults,
        };
    }
    if (action.type === "RESTART"){
        return initialState;
    }
    return state
};

let value:any;
export const QuizContext = createContext(value);

export const QuizProvider = ({children}:any):any => {
    const value=  useReducer(reducer, initialState);
    return(
    <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
};