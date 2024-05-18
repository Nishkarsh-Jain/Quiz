import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/quiz.css";
import Quiz from "./components/Quiz";
import { QuizProvider } from "./contexts/quiz";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Removed the React.StrictMode to prevent unnessary console logs.
    <QuizProvider>
      <Quiz />
    </QuizProvider>
);


