import React, { useState, useEffect, useRef } from "react";
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

  const answersListEl = useRef(null);
  const [answerInFocus, setAnswerInFocus] = useState("");
  const answersRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function optionClick(item) {
    if (!submittedAnswer) {
      setSelectedAnswer(item);
      setErrMsg(null);
    }
  }

  function handleKeyPress(e) {
    let tmpInd = Number(answerInFocus.at(-1));
    if (e.code === "ArrowUp") {
      if (document.activeElement === answersRefs[0].current) {
        return;
      } else {
        setAnswerInFocus(() => `ans${tmpInd - 1}`);
      }
    }
    if (e.code === "ArrowDown") {
      if (document.activeElement === answersRefs[3].current) {
        return;
      } else {
        setAnswerInFocus(() => `ans${tmpInd + 1}`);
      }
    }
    if (e.code === "Enter") {
      optionClick(options[tmpInd]);
      setAnswerInFocus("");
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

  useEffect(
    function () {
      function callback(e) {
        // console.log(e.code);
        // console.log("Before if: ", document.activeElement);
        if (document.activeElement === answersListEl.current) {
          // console.log("MenuEl", menuEl.current);
          setAnswerInFocus(() => "ans0");
          answersRefs[0].current.focus();
        } else if (
          answerInFocus &&
          (e.code === "ArrowUp" || e.code === "ArrowDown")
        ) {
          let tmpInd = Number(answerInFocus.at(-1));
          answersRefs[tmpInd].current.focus();
          // console.log("Option", document.activeElement);
        }
      }

      document.addEventListener("keyup", callback);
      return () => document.addEventListener("keyup", callback);
    },
    [answerInFocus]
  );

  return (
    <section
      className="right-side"
      role="listbox"
      tabIndex={"0"}
      ref={answersListEl}
      aria-label="List of possible answers"
      aria-activedescendant="ans0"
    >
      {options.map((item, index) => (
        <OptionButton
          optionName={item}
          optionMarker={65 + index}
          index={`ans${index}`}
          optionSelected={0}
          optionButtonRef={answersRefs[index]}
          activeOnFocus={`ans${index}` === answerInFocus ? true : false}
          // activeEl={index === 0 ? true : false}
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
