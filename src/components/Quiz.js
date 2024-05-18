import { useContext, useEffect } from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Use https://opentdb.com/ - URL Encoding (RFC 3986)
  const API_URL =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986";
  
  useEffect(() => {
    // To avoid every time render to preserve state we will render it only when questions length is zero or any error occur
    if (quizState.questions.length > 0 || quizState.error) {
      return;
    }
    fetch(API_URL)
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "QUESTIONS_LOADED", payload: data.results });
      })
      .catch((error) => {
        dispatch({ type: "SERVER_ERROR", payload: error.message });
      });
  });

  return (
    <div className="quiz">
      {quizState.error && (
        <div className="results">
          <div className="congratulations">SERVER ERROR</div>
          <br />
          <div className="result-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}
      {quizState.showResult && quizState.questions.length > 0 && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <br />
          <div className="result-info">
            <div>You have completed the quiz.</div>
            <div>
              You've got {quizState.correctAnswerCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <br />
          <div
            className="next-button"
            onClick={() => {
              dispatch({ type: "RESTART" });
            }}
          >
            RESTART
          </div>
        </div>
      )}
      {!quizState.showResult && quizState.questions.length > 0 && (
        <>
          <div className="score">
            Question: {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => {
              dispatch({ type: "NEXT" });
            }}
          >
            Next
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
