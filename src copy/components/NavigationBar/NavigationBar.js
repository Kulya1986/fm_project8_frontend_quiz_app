import React from "react";
import "./NavigationBar.css";
import ColorSchemeToggle from "../ColorSchemeToggle/ColorSchemeToggle";
import IconMarker from "../IconMarker/IconMarker";

export default function NavigationBar({
  optionName,
  optionColor,
  colorScheme,
  onColorSchemeChange,
}) {
  const justify = optionName && optionColor ? "space-between" : "end";
  const spaceToCopy = window.screen.availWidth <= 480 ? "16px" : "28px";
  return (
    <nav style={{ justifyContent: justify }}>
      {optionName && optionColor && (
        <div id="section-logo">
          <IconMarker
            optionName={optionName}
            optionColor={optionColor}
            spaceToCopy={spaceToCopy}
          />
          <h3>{optionName}</h3>
        </div>
      )}

      <ColorSchemeToggle
        colorScheme={colorScheme}
        onColorToggleClick={onColorSchemeChange}
      />
    </nav>
  );
}
