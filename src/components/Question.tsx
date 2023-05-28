import { Answer } from "./Answer";
import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
export function Question(){
    const [quizState, dispatch] = useContext(QuizContext);
    console.log( 'Question', quizState );
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex].question
    return (
        <div>
            // Тукущий вопрос
            <div className="question">
                {currentQuestion}</div>
            <div className="answers">
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
            </div>
        </div>
    )
}