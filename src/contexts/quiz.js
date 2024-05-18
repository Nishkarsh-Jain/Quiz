import { createContext, useReducer } from "react";
//import questions from "../resources/data";
import { normalizeQuestions, shuffleAnswers } from "../resources/helper";

const initialState = {
  currentQuestionIndex: 0,
  //questions,
  //answers: shuffleAnswers(questions[0]),
  questions: [],
  answers: [],
  showResult: false,
  currentAnswer: "",
  correctAnswerCount: 0,
  error: null,
};

// To perform certain action & change the state accordingly.
const reducer = (state, action) => {
  switch (action.type) {
    case "QUESTIONS_LOADED":
      const normalizedQuestions = normalizeQuestions(action.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    case "NEXT":
      const showResult =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResult
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResult
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResult,
        answers,
        currentAnswer: "",
      };
    case "RESTART":
      return initialState;
    case "SELECTED_ANSWER":
      const correctAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
      };
    case "SERVER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// To reuse the properties within childern components.
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
