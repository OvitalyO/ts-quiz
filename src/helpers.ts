// дополнительные функции, которые что-то делают и возвращают результат
type Question = {

}
export const shuffleAnswers = question: Question => {
    const unshuffledAnswers: string[] = [
        // правильный ответ
        question.correctAnswer,
        ...question.incorrectAnswers
    ]

    // превращаем массив строк в массив объектов
    return unshuffledAnswers
        .map((unshuffledAnswers) => ({
            sort: Math.random(),
            value: unshuffledAnswer,
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};

export const normalizeQuestions = (backendQuestions) => {
    return backendQuestions.map((backendQuestion) => {
        const incorrectAnswers = backendQuestion.incorrect_answers.map(
            (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
        );
        return {
            correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
            question: decodeURIComponent(backendQuestion.question),
            incorrectAnswers,
        };
    });
};
