import React from "react";
import useImage from "../../useImage";
import "./IconMarker.css";

export default function IconMarker({
  optionName,
  optionColor,
  spaceToCopy = "28px",
}) {
  const imgSource = `icon-${optionName.toLowerCase()}.svg`;
  const { loading, image } = useImage(imgSource);

  if (!loading)
    return (
      <div
        style={{ backgroundColor: optionColor, marginRight: spaceToCopy }}
        className="logo-bg"
      >
        <img
          alt={optionName}
          src={image}
          style={{ margin: window.screen.availWidth <= 480 ? "4px" : "8px" }}
        />
      </div>
    );
}
