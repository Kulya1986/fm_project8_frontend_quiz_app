import React, { useEffect, useRef, useState } from "react";
import OptionButton from "../OptionButton/OptionButton";
// import { useKey } from "../../useKey";

export default function StarterMenu({ data, sectionClick, colorScheme }) {
  const menuEl = useRef(null);
  const [optInFocus, setOptInFocus] = useState("");

  // useKey("ArrowDown", function () {
  //   if (document.activeElement === selectedOpt.current) return;
  //   selectedOpt.current.focus();
  //   isSelected = true;
  // });

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function handleKeyPress(e) {
    // console.log("OptFocused", optInFocus);
    // console.log("Number", Number(optInFocus.at(-1)));
    // console.log("Active element of button press", document.activeElement);
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

  useEffect(
    function () {
      function callback(e) {
        // console.log(e.code);
        // console.log("Before if: ", document.activeElement);
        if (document.activeElement === menuEl.current) {
          // console.log("MenuEl", menuEl.current);
          setOptInFocus(() => "opt0");
          optionRefs[0].current.focus();
        } else if (
          optInFocus &&
          (e.code === "ArrowUp" || e.code === "ArrowDown")
        ) {
          let tmpInd = Number(optInFocus.at(-1));
          optionRefs[tmpInd].current.focus();
          // console.log("Option", document.activeElement);
        }
      }

      document.addEventListener("keyup", callback);
      return () => document.addEventListener("keyup", callback);
    },
    [optInFocus]
  );

  return (
    <section
      className="right-side"
      role="listbox"
      ref={menuEl}
      tabIndex={0}
      aria-label="List of subjects"
      aria-activedescendant={"opt0"}
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
