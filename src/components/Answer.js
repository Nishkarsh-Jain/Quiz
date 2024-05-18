const Answer = ({
  answerText,
  onSelectAnswer,
  index,
  currentAnswer,
  correctAnswer,
}) => {
  const letterMapping = ["A", "B", "C", "D"];
  const isAnswerCorrect = currentAnswer && answerText === correctAnswer;
  const isAnswerWrong =
    currentAnswer === answerText && currentAnswer !== correctAnswer;
  const correctAnswerClass = isAnswerCorrect ? "correct-answer" : "";
  const wrongAnswerClass = isAnswerWrong ? "wrong-answer" : "";
  const disabledClass = currentAnswer? "disabled-answer":"";

  return (
    <div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} onClick={() => onSelectAnswer(answerText)}>
      <div className="answer-letter">{letterMapping[index]}</div>
      <div className="answer-text">{answerText}</div>
    </div>
  );
};

export default Answer;
