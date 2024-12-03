import React, { useState } from "react";
import OptionButton from "../OptionButton/OptionButton";
import "./QuestionOptions.css";
import incorrectIcon from "./../../assets/images/icon-incorrect.svg";

export default function QuestionOptions({
  options,
  correctAnswer,
  correctAnswersCount,
  nextQuestion,
  colorScheme,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  function optionClick(item) {
    if (!submittedAnswer) {
      setSelectedAnswer(item);
      setErrMsg(null);
    }
  }

  function handleSubmit() {
    if (!selectedAnswer && !submittedAnswer)
      setErrMsg("Please select an answer");
    else if (!submittedAnswer) {
      if (selectedAnswer?.toLowerCase() === correctAnswer?.toLowerCase()) {
        correctAnswersCount();
        setCorrect(true);
      }
      setSubmittedAnswer(selectedAnswer);
      setSelectedAnswer(null);
    } else {
      nextQuestion();
      setSubmittedAnswer(null);
      setCorrect(false);
    }
  }

  return (
    <>
      {options.map((item, index) => (
        <OptionButton
          optionName={item}
          optionMarker={65 + index}
          imageOn={false}
          isSelected={
            item?.toLowerCase() === selectedAnswer?.toLowerCase() ? true : false
          }
          pickedCorrect={
            item?.toLowerCase() === submittedAnswer?.toLowerCase() && correct
              ? true
              : false
          }
          pickedIncorrect={
            item?.toLowerCase() === submittedAnswer?.toLowerCase() && !correct
              ? true
              : false
          }
          correct={
            item?.toLowerCase() === correctAnswer?.toLowerCase() &&
            submittedAnswer
              ? true
              : false
          }
          lightOff={colorScheme}
          key={item}
          onButtonClick={optionClick}
        />
      ))}
      <div className={`button-cta ${colorScheme ? "" : "light"}`}>
        <input
          type="button"
          value={`${submittedAnswer ? "Next Question" : "Submit Answer"}`}
          onClick={handleSubmit}
        ></input>
        <div className="button-cta-hover" onClick={handleSubmit}></div>
      </div>

      {errMsg && (
        <div className="err-msg">
          <img src={incorrectIcon} alt={`${errMsg}`} />
          <p className={`${colorScheme ? "" : "light"}`}>{errMsg}</p>
        </div>
      )}
    </>
  );
}
