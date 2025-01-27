import React from "react";
import "./OptionButton.css";
import IconMarker from "../IconMarker/IconMarker";
import correctIcon from "./../../assets/images/icon-correct.svg";
import incorrectIcon from "./../../assets/images/icon-incorrect.svg";

export default function OptionButton({
  optionName,
  optionColor,
  onButtonClick,
  optionMarker,
  index,
  optionButtonRef,
  lightOff = false,
  imageOn = true,
  isSelected,
  pickedCorrect,
  pickedIncorrect,
  correct,
  activeOnFocus,
  onKeyDownPress,
}) {
  const marker = String.fromCharCode(optionMarker);
  const spaceToCopy = window.screen.availWidth <= 480 ? "16px" : "32px";

  return (
    <div
      role={"option"}
      aria-selected={activeOnFocus}
      id={index}
      ref={optionButtonRef}
      tabIndex={activeOnFocus ? 0 : -1}
      className={`option-button ${isSelected ? "selected" : ""} ${
        pickedCorrect ? "picked-correct" : ""
      } ${pickedIncorrect ? "picked-incorrect" : ""} ${
        !isSelected && !pickedCorrect && !pickedIncorrect ? "not-selected" : ""
      } ${lightOff ? "" : "light"}`}
      onClick={() => onButtonClick(optionName)}
      onKeyDown={(e) => onKeyDownPress(e)}
    >
      <div className="option-logo">
        <div>
          {imageOn ? (
            <IconMarker
              optionName={optionName}
              optionColor={optionColor}
              spaceToCopy={spaceToCopy}
            />
          ) : (
            <div
              className={`${isSelected ? "selected" : ""} ${
                pickedCorrect ? "picked-correct" : ""
              } ${pickedIncorrect ? "picked-incorrect" : ""}`}
            >
              <h3>{marker}</h3>
            </div>
          )}

          <h3>{optionName}</h3>
        </div>
        {(correct || pickedCorrect) && <img src={correctIcon} alt="correct" />}
        {pickedIncorrect && <img src={incorrectIcon} alt="incorrect" />}
      </div>
    </div>
  );
}
