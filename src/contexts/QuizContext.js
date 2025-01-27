import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  quizData: [],
  activeSection: "",
  activeSectionData: [],
  currentQuestion: null,
  correctAnswers: 0,
  selectedAnswer: "",
  submittedAnswer: "",
  correct: false,
  errorMsgInQuiz: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "load_quiz_data":
      return { ...state, quizData: action.payload, error: "" };
    case "data_load_error":
      return { ...state, error: action.payload };
    case "play_again":
      return {
        ...state,
        activeSection: "",
        activeSectionData: [],
        correctAnswers: 0,
        currentQuestion: null,
      };
    case "track_progress":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        submittedAnswer: "",
        correct: false,
      };
    case "section_select":
      return {
        ...state,
        activeSection: action.payload,
        activeSectionData: state.quizData.filter(
          (item) => item.title.toLowerCase() === action.payload.toLowerCase()
        ),

        currentQuestion: 1,
      };
    case "answer_selected":
      return { ...state, selectedAnswer: action.payload, errorMsgInQuiz: "" };
    case "answer_submitted":
      return {
        ...state,
        correctAnswers:
          state.selectedAnswer?.toLowerCase() ===
          state.activeSectionData[0].questions[
            state.currentQuestion - 1
          ].answer?.toLowerCase()
            ? state.correctAnswers + 1
            : state.correctAnswers,
        submittedAnswer: state.selectedAnswer,
        selectedAnswer: "",
        correct:
          state.selectedAnswer?.toLowerCase() ===
          state.activeSectionData[0].questions[
            state.currentQuestion - 1
          ].answer?.toLowerCase()
            ? true
            : false,
      };
    case "quiz_error_msg":
      return { ...state, errorMsgInQuiz: action.payload };
    default:
      throw new Error("UNknown action type");
  }
}

function QuizProvider({ children }) {
  const [
    {
      quizData,
      activeSection,
      activeSectionData,
      currentQuestion,
      correctAnswers,
      submittedAnswer,
      selectedAnswer,
      errorMsgInQuiz,
      correct,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleActiveSectionSelect(section) {
    dispatch({ type: "section_select", payload: section });
  }

  function handleSubmitClick() {
    if (!selectedAnswer && !submittedAnswer)
      dispatch({ type: "quiz_error_msg", payload: "Please select an answer" });
    else if (!submittedAnswer) {
      dispatch({ type: "answer_submitted" });
    } else {
      dispatch({ type: "track_progress" });
    }
  }

  // to fetch data for the quiz sections and questions
  useEffect(function () {
    async function fetchQuizData() {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        dispatch({ type: "load_quiz_data", payload: data.quizzes });
      } catch {
        dispatch({
          type: "data_load_error",
          payload: "Problem while loading data",
        });
      }
    }
    fetchQuizData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizData,
        activeSection,
        activeSectionData,
        currentQuestion,
        correctAnswers,
        submittedAnswer,
        selectedAnswer,
        correct,
        errorMsgInQuiz,
        dispatch,
        handleActiveSectionSelect,
        handleSubmitClick,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) throw new Error("Irrelevant use of context");
  return context;
}

export { QuizProvider, useQuiz };
