import React from "react";
import OptionButton from "../OptionButton/OptionButton";

export default function StarterMenu({
  data,
  sectionClick,
  colorScheme,
  optInFocus,
  setOptInFocus,
  optionRefs,
  listEl,
}) {
  function handleKeyPress(e) {
    let tmpInd = Number(optInFocus.at(-1));

    if (e.code === "ArrowUp") {
      if (document.activeElement === optionRefs[0].current) {
        return;
      } else {
        setOptInFocus(() => `opt${tmpInd - 1}`);
      }
    }
    if (e.code === "ArrowDown") {
      if (document.activeElement === optionRefs[3].current) {
        return;
      } else {
        setOptInFocus(() => `opt${tmpInd + 1}`);
      }
    }
    if (e.code === "Enter") {
      sectionClick(data[tmpInd].title);
      setOptInFocus("");
    }
  }

  return (
    <section
      className="right-side"
      role="listbox"
      ref={listEl}
      tabIndex={0}
      aria-label="List of subjects"
      aria-activedescendant={optInFocus}
    >
      {data.map((item, i) => (
        <OptionButton
          optionName={item.title}
          optionColor={item.color}
          index={`opt${i}`}
          optionSelected={0}
          lightOff={colorScheme}
          key={item.title}
          onButtonClick={sectionClick}
          onKeyDownPress={handleKeyPress}
          optionButtonRef={optionRefs[i]}
          activeOnFocus={`opt${i}` === optInFocus ? true : false}
        />
      ))}
    </section>
  );
}
