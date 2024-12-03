import React from "react";
import OptionButton from "../OptionButton/OptionButton";

export default function StarterMenu({ data, sectionClick, colorScheme }) {
  return (
    <>
      {data.map((item) => (
        <OptionButton
          optionName={item.title}
          optionColor={item.color}
          lightOff={colorScheme}
          key={item.title}
          onButtonClick={sectionClick}
        />
      ))}
    </>
  );
}
