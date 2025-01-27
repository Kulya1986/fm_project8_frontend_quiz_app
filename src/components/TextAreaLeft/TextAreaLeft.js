import React from "react";
import { useQuiz } from "../../contexts/QuizContext";

export default function TextAreaLeft({
  // header,
  // headerSpan,
  colorScheme,
  children,
}) {
  const { activeSection } = useQuiz();

  return (
    <>
      <h1>
        <span>{!activeSection ? "Welcome to the" : "Quiz completed"}</span>
        <br />
        {!activeSection ? "Frontend Quiz!" : "You scored..."}
      </h1>
      {children && <p className={`${!colorScheme && "light"}`}>{children}</p>}
    </>
  );
}
