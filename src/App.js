import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import TextAreaLeft from "./components/TextAreaLeft/TextAreaLeft";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import QuestionArea from "./components/QuestionArea/QuestionArea";
import StarterMenu from "./components/StarterMenu/StarterMenu";
import QuestionOptions from "./components/QuestionOptions/QuestionOptions";
import Score from "./components/Score/Score";
import { useLocalStorageState } from "./useLocalStorageState";
import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageState(
    true,
    "darkSchemeOn"
  );

  const {
    quizData,
    activeSection,
    currentQuestion,
    activeSectionData,
    submittedAnswer,
  } = useQuiz();

  // for keyboard navigation

  const listEl = useRef(null);
  const [optInFocus, setOptInFocus] = useState("opt0");
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // for keyboard navigation

  function handleColorSchemeChange() {
    setColorScheme((curr) => !curr);
  }

  // to implement keyboard navigation throughout the quiz
  useEffect(function () {
    function callback(e) {
      if (!submittedAnswer) {
        if (document.activeElement === listEl.current) {
          setOptInFocus(() => "opt0");
          optionRefs[0].current.focus();
        } else if (
          optInFocus &&
          (e.code === "ArrowUp" || e.code === "ArrowDown")
        ) {
          let tmpInd = Number(optInFocus.at(-1));
          optionRefs[tmpInd].current.focus();
        }
      }
    }

    document.addEventListener("keyup", callback);
    return () => document.addEventListener("keyup", callback);
  });

  if (!quizData) return <div>Loading quiz data ...</div>;

  return (
    <div id="container" className={`${colorScheme ? "dark" : "light"}`}>
      <NavigationBar
        colorScheme={colorScheme}
        onColorSchemeChange={handleColorSchemeChange}
      />
      <main>
        <section className="left-side">
          {!activeSection ||
          currentQuestion > activeSectionData[0].questions.length ? (
            <TextAreaLeft colorScheme={colorScheme}>
              {!activeSection ? "Pick a subject to get started." : ""}
            </TextAreaLeft>
          ) : (
            <QuestionArea colorScheme={colorScheme} />
          )}
        </section>
        <>
          {!activeSection ? (
            <StarterMenu
              colorScheme={colorScheme}
              optInFocus={optInFocus}
              setOptInFocus={setOptInFocus}
              listEl={listEl}
              optionRefs={optionRefs}
            />
          ) : currentQuestion > activeSectionData[0].questions.length ? (
            <section className="right-side">
              <Score colorScheme={colorScheme} />
            </section>
          ) : (
            <QuestionOptions
              colorScheme={colorScheme}
              optInFocus={optInFocus}
              setOptInFocus={setOptInFocus}
              listEl={listEl}
              optionRefs={optionRefs}
            />
          )}
        </>
      </main>
    </div>
  );
}
