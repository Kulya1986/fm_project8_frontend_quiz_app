import React from "react";
import "./QuestionArea.css";

export default function QuestionArea({
  questionText,
  questionNumber,
  totalQuestions,
  colorScheme,
}) {
  return (
    <div id="question">
      <p
        className={`${colorScheme ? "" : "light"}`}
      >{`Question ${questionNumber} of ${totalQuestions}`}</p>
      <h2>{questionText}</h2>
    </div>
  );
}
