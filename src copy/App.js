import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import TextAreaLeft from "./components/TextAreaLeft/TextAreaLeft";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import QuestionArea from "./components/QuestionArea/QuestionArea";
import StarterMenu from "./components/StarterMenu/StarterMenu";
import QuestionOptions from "./components/QuestionOptions/QuestionOptions";
import Score from "./components/Score/Score";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageState(
    true,
    "darkSchemeOn"
  );
  const [quizData, setQuizData] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSectionData, setActiveSectionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  // for keyboard navigation

  const listEl = useRef(null);
  const [optInFocus, setOptInFocus] = useState("opt0");
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // for keyboard navigation

  function handleActiveSectionSelect(section) {
    setActiveSection(section);
    setActiveSectionData(
      quizData.filter(
        (item) => item.title.toLowerCase() === section.toLowerCase()
      )
    );
    setCurrentQuestion(1);
  }

  function handleQuestionsProgress() {
    setCurrentQuestion((curr) => curr + 1);
  }

  function handleCorrectAnswersCount() {
    setCorrectAnswers((curr) => curr + 1);
  }
  function handlePlayAgain() {
    setActiveSection(null);
    setActiveSectionData(null);
    setCorrectAnswers(0);
    setCurrentQuestion(null);
  }

  function handleColorSchemeChange() {
    setColorScheme((curr) => !curr);
  }

  // to change the color scheme of the page backgrouond
  useEffect(() => {
    if (colorScheme) {
      if (window.screen.availWidth <= 480) {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-mobile-dark.svg")';
      } else if (window.screen.availWidth <= 768) {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-tablet-dark.svg")';
      } else {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-desktop-dark.svg")';
      }
      document.body.style.backgroundColor = "#313e51";
      document.body.style.color = "#ffffff";
    } else {
      if (window.screen.availWidth <= 480) {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-mobile-light.svg")';
      } else if (window.screen.availWidth <= 768) {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-tablet-light.svg")';
      } else {
        document.body.style.backgroundImage =
          'url("/images/pattern-background-desktop-light.svg")';
      }
      document.body.style.backgroundColor = "#f4f6fa";
      document.body.style.color = "#313E51";
    }
  }, [colorScheme]);

  // to fetch data for the quiz sections and questions
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setQuizData(data.quizzes))
      .catch((error) => console.error("Data fetching error:", error));
  }, []);

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
    <div id="container">
      {activeSection ? (
        <NavigationBar
          optionName={activeSectionData[0].title}
          optionColor={activeSectionData[0].color}
          colorScheme={colorScheme}
          onColorSchemeChange={handleColorSchemeChange}
        />
      ) : (
        <NavigationBar
          colorScheme={colorScheme}
          onColorSchemeChange={handleColorSchemeChange}
        />
      )}
      <main>
        <section className="left-side">
          {!activeSection && (
            <TextAreaLeft
              header={"Frontend Quiz!"}
              headerSpan={"Welcome to the"}
              colorScheme={colorScheme}
            >
              Pick a subject to get started.
            </TextAreaLeft>
          )}
          {activeSection &&
            currentQuestion > activeSectionData[0].questions.length && (
              <TextAreaLeft
                header={"You scored..."}
                headerSpan={"Quiz completed"}
                colorScheme={colorScheme}
              />
            )}
          {activeSection &&
            currentQuestion <= activeSectionData[0].questions.length && (
              <>
                <QuestionArea
                  questionText={
                    activeSectionData[0].questions[currentQuestion - 1].question
                  }
                  colorScheme={colorScheme}
                  questionNumber={currentQuestion}
                  totalQuestions={activeSectionData[0].questions.length}
                />
                <ProgressBar
                  colorScheme={colorScheme}
                  questionsCompleted={currentQuestion - 1}
                  totalQuestions={activeSectionData[0].questions.length}
                />
              </>
            )}
        </section>
        <>
          {!activeSection && (
            <StarterMenu
              data={quizData}
              colorScheme={colorScheme}
              sectionClick={handleActiveSectionSelect}
              optInFocus={optInFocus}
              setOptInFocus={setOptInFocus}
              listEl={listEl}
              optionRefs={optionRefs}
            />
          )}
          {activeSection &&
            currentQuestion > activeSectionData[0].questions.length && (
              <section className="right-side">
                <Score
                  section={activeSection}
                  sectionColor={activeSectionData[0].color}
                  correctAnswers={correctAnswers}
                  totalQuestions={activeSectionData[0].questions.length}
                  colorScheme={colorScheme}
                  onButtonClick={handlePlayAgain}
                />
              </section>
            )}
          {activeSection &&
            currentQuestion <= activeSectionData[0].questions.length && (
              <QuestionOptions
                options={
                  activeSectionData[0].questions[currentQuestion - 1].options
                }
                correctAnswer={
                  activeSectionData[0].questions[currentQuestion - 1].answer
                }
                colorScheme={colorScheme}
                correctAnswersCount={handleCorrectAnswersCount}
                nextQuestion={handleQuestionsProgress}
                optInFocus={optInFocus}
                setOptInFocus={setOptInFocus}
                listEl={listEl}
                optionRefs={optionRefs}
                submittedAnswer={submittedAnswer}
                setSubmittedAnswer={setSubmittedAnswer}
              />
            )}
        </>
      </main>
    </div>
  );
}
