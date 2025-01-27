import React from "react";
import "./QuestionArea.css";
import { useQuiz } from "../../contexts/QuizContext";

export default function QuestionArea({ colorScheme }) {
  const { activeSectionData, currentQuestion } = useQuiz();
  const totalQuestions = activeSectionData[0].questions.length;
  return (
    <>
      <div id="question">
        <p
          className={`${colorScheme ? "" : "light"}`}
        >{`Question ${currentQuestion} of ${totalQuestions}`}</p>
        <h2>{activeSectionData[0].questions[currentQuestion - 1].question}</h2>
      </div>
      <div
        id="progress-wrapper"
        className={`${colorScheme ? "" : "light-progress"}`}
      >
        <progress
          className={`${colorScheme ? "" : "light-progress"}`}
          max={totalQuestions}
          value={currentQuestion}
          aria-label={"Quiz progress"}
        ></progress>
      </div>
    </>
  );
}
