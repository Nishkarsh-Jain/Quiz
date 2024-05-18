import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import Answer from "./Answer";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  return (
    <>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answer
            key={index}
            answerText={answer}
            index={index}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECTED_ANSWER", payload: answerText })
            }
          />
        ))}
      </div>
    </>
  );
};

export default Question;
