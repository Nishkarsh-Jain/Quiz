export const shuffleAnswers = (question) => {
  const unshuffleAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];
  // Now I want to shuffle those answers in every render/refersh for that adding a num to unshuffleAnswers array of string.
  return unshuffleAnswers
    .map((unshuffleAnswer) => ({
      num: Math.random(),
      value: unshuffleAnswer,
    }))
    .sort((a, b) => a.num - b.num)
    .map((x) => x.value);
};

export const normalizeQuestions = (backendQuestions) => {
  return backendQuestions.map((backendQuestion) => {
    const incorrectAnswers = backendQuestion.incorrect_answers.map(
      (incorrect_answer) => decodeURIComponent(incorrect_answer)
    );
    return {
      question: decodeURIComponent(backendQuestion.question),
      correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
      incorrectAnswers,
    };
  });
};
