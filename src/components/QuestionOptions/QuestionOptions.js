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
  listEl,
  optInFocus,
  setOptInFocus,
  optionRefs,
  submittedAnswer,
  setSubmittedAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  function optionClick(item) {
    if (!submittedAnswer) {
      setSelectedAnswer(item);
      setErrMsg(null);
    }
  }

  function handleKeyPress(e) {
    if (!submittedAnswer) {
      let tmpInd = Number(optInFocus.at(-1));
      if (e.code === "ArrowUp") {
        if (document.activeElement === optionRefs[0].current) {
          return;
        } else {
          setOptInFocus(() => `opt${tmpInd - 1}`);
        }
      }
      if (e.code === "ArrowDown") {
        if (document.activeElement === optionRefs[3].current) {
          return;
        } else {
          setOptInFocus(() => `opt${tmpInd + 1}`);
        }
      }
      if (e.code === "Enter") {
        optionClick(options[tmpInd]);
      }
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
      setOptInFocus("opt0");
    }
  }

  return (
    <section
      className="right-side"
      role="listbox"
      tabIndex={"0"}
      ref={listEl}
      aria-label="List of possible answers"
      aria-activedescendant={optInFocus}
    >
      {options.map((item, index) => (
        <OptionButton
          optionName={item}
          optionMarker={65 + index}
          index={`opt${index}`}
          optionSelected={0}
          optionButtonRef={optionRefs[index]}
          activeOnFocus={`opt${index}` === optInFocus ? true : false}
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
          onKeyDownPress={handleKeyPress}
        />
      ))}
      <div className={`button-cta ${colorScheme ? "" : "light"}`}>
        <input
          type="button"
          value={`${submittedAnswer ? "Next Question" : "Submit Answer"}`}
          onClick={handleSubmit}
          onSubmit={handleSubmit}
        ></input>
        <div className="button-cta-hover" onClick={handleSubmit}></div>
      </div>

      {errMsg && (
        <div className="err-msg">
          <img src={incorrectIcon} alt={`${errMsg}`} />
          <p className={`${colorScheme ? "" : "light"}`}>{errMsg}</p>
        </div>
      )}
    </section>
  );
}
