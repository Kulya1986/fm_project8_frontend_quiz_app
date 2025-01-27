import React from "react";
import "./NavigationBar.css";
import ColorSchemeToggle from "../ColorSchemeToggle/ColorSchemeToggle";
import IconMarker from "../IconMarker/IconMarker";
import { useQuiz } from "../../contexts/QuizContext";

export default function NavigationBar({ colorScheme, onColorSchemeChange }) {
  const { activeSection, activeSectionData } = useQuiz();

  const justify = activeSection ? "space-between" : "end";
  const spaceToCopy = window.screen.availWidth <= 480 ? "16px" : "28px";

  return (
    <nav style={{ justifyContent: justify }}>
      {activeSection && (
        <div id="section-logo">
          <IconMarker
            optionName={activeSection}
            optionColor={activeSectionData[0].color}
            spaceToCopy={spaceToCopy}
          />
          <h3>{activeSection}</h3>
        </div>
      )}

      <ColorSchemeToggle
        colorScheme={colorScheme}
        onColorToggleClick={onColorSchemeChange}
      />
    </nav>
  );
}
