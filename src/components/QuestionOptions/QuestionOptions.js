import React from "react";
import OptionButton from "../OptionButton/OptionButton";
import "./QuestionOptions.css";
import incorrectIcon from "./../../assets/images/icon-incorrect.svg";
import { useQuiz } from "../../contexts/QuizContext";

export default function QuestionOptions({
  colorScheme,
  listEl,
  optInFocus,
  setOptInFocus,
  optionRefs,
}) {
  const {
    activeSectionData,
    currentQuestion,
    submittedAnswer,
    selectedAnswer,
    correct,
    errorMsgInQuiz,
    handleSubmitClick,
    dispatch,
  } = useQuiz();

  const options = activeSectionData[0].questions[currentQuestion - 1].options;

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
        dispatch({ type: "answer_selected", payload: options[tmpInd] });
      }
    }
  }

  function handleSubmit() {
    if (!selectedAnswer && submittedAnswer) setOptInFocus("opt0");
    handleSubmitClick();
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
            item?.toLowerCase() ===
              activeSectionData[0].questions[
                currentQuestion - 1
              ].answer?.toLowerCase() && submittedAnswer
              ? true
              : false
          }
          lightOff={colorScheme}
          key={item}
          onButtonClick={() =>
            dispatch({ type: "answer_selected", payload: item })
          }
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

      {errorMsgInQuiz && (
        <div className="err-msg">
          <img src={incorrectIcon} alt={`${errorMsgInQuiz}`} />
          <p className={`${colorScheme ? "" : "light"}`}>{errorMsgInQuiz}</p>
        </div>
      )}
    </section>
  );
}
