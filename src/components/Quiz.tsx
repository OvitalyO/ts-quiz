import {Question} from "./Question";
import {useContext} from "react";
import {QuizContext} from "../contexts/quiz";



export function Quiz(){
    const [quizState, dispatch] = useContext(QuizContext);
    console.log('value', quizState);

    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations"></div>
                    <div className="results-info">
                        <div>Ответы на вопросы</div>
                        <div>4 из 8</div>
                        <div
                            className="next-button"
                            onClick={()=> dispatch({type: "Restart"})}
                        >Начать заново</div>
                    </div>
                </div>
            )}
            {!quizState.showResults &&(<div>
                <div className="score">Вопросы {quizState.currentQuestionIndex + 1}/{quizState.questions.length}</div>
                <Question />
                <div
                    className="next-button"
                    //экшен
                    onClick={()=> dispatch({type: 'NEXT_QUESTION'})}
                >
                    Следующий вопрос</div>
            </div>)};
        </div>
    )
}