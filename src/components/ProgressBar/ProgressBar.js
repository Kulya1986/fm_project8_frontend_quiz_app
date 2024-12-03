import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({
  questionsCompleted,
  totalQuestions,
  colorScheme,
}) {
  const columnsNum = `repeat(${totalQuestions}, 1fr)`;
  const completedColumns = `1/span ${questionsCompleted}`;

  return (
    <div
      className={`progress-bar ${colorScheme ? "" : "light-progress"}`}
      style={{ gridTemplateColumns: columnsNum }}
    >
      {questionsCompleted !== 0 && (
        <div
          className="completed"
          style={{ gridColumn: completedColumns }}
        ></div>
      )}
      {questionsCompleted < totalQuestions && <div className="left"></div>}
    </div>
  );
}
