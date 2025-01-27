import React from "react";
import IconMarker from "../IconMarker/IconMarker";
import "./Score.css";

export default function Score({
  section,
  sectionColor,
  correctAnswers,
  totalQuestions,
  onButtonClick,
  colorScheme,
}) {
  const spaceToCopy = window.screen.availWidth <= 480 ? "16px" : "24px";
  return (
    <>
      <div className={`score ${colorScheme ? "" : "light"}`}>
        <div>
          <IconMarker
            optionName={section}
            optionColor={sectionColor}
            spaceToCopy={spaceToCopy}
          />
          <h3>{section}</h3>
        </div>
        <div>
          <p className="display">{correctAnswers}</p>
          <p className="total-questions">{`out of ${totalQuestions}`}</p>
        </div>
      </div>

      <div className={`button-cta ${colorScheme ? "" : "light"}`}>
        <input type="button" value="Play Again" onClick={onButtonClick}></input>
        <div className="button-cta-hover" onClick={onButtonClick}></div>
      </div>
    </>
  );
}
