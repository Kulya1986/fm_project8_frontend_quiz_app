import React from "react";
import IconMarker from "../IconMarker/IconMarker";
import "./Score.css";
import { useQuiz } from "../../contexts/QuizContext";

export default function Score({
  // section,
  // sectionColor,
  // correctAnswers,
  // totalQuestions,
  // onButtonClick,
  colorScheme,
}) {
  const { activeSectionData, correctAnswers, dispatch } = useQuiz();
  const totalQuestions = activeSectionData[0].questions.length;
  const spaceToCopy = window.screen.availWidth <= 480 ? "16px" : "24px";
  return (
    <>
      <div className={`score ${colorScheme ? "" : "light"}`}>
        <div>
          <IconMarker
            optionName={activeSectionData[0].title}
            optionColor={activeSectionData[0].color}
            spaceToCopy={spaceToCopy}
          />
          <h3>{activeSectionData[0].title}</h3>
        </div>
        <div>
          <p className="display">{correctAnswers}</p>
          <p className="total-questions">{`out of ${totalQuestions}`}</p>
        </div>
      </div>

      <div className={`button-cta ${colorScheme ? "" : "light"}`}>
        <input
          type="button"
          value="Play Again"
          onClick={() => dispatch({ type: "play_again" })}
        ></input>
        <div
          className="button-cta-hover"
          onClick={() => dispatch({ type: "play_again" })}
        ></div>
      </div>
    </>
  );
}
