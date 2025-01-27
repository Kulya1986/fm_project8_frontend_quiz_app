import React from "react";
import "./ColorSchemeToggle.css";
import Sun_dark from "./../../assets/images/icon-sun-dark.svg";
import Sun_light from "./../../assets/images/icon-sun-light.svg";
import Moon_dark from "./../../assets/images/icon-moon-dark.svg";
import Moon_light from "./../../assets/images/icon-moon-light.svg";

export default function ColorSchemeToggle({ colorScheme, onColorToggleClick }) {
  return (
    <div className="color-scheme">
      <img
        src={colorScheme ? Sun_light : Sun_dark}
        alt="color-scheme-light"
        className="color-scheme-light"
      />
      <div className="color-scheme-toggle-wrapper">
        <label className="switch" htmlFor="color-scheme-toggle">
          <input
            type="checkbox"
            id="color-scheme-toggle"
            name="dark-color-scheme-on"
            defaultChecked={colorScheme}
            onClick={onColorToggleClick}
          />
          <div className="slider"></div>
        </label>
      </div>
      <img
        src={colorScheme ? Moon_light : Moon_dark}
        alt="color-scheme-dark"
        className="color-scheme-dark"
      />
    </div>
  );
}
