import React from "react";

export default function TextAreaLeft({
  header,
  headerSpan,
  colorScheme,
  children,
}) {
  return (
    <>
      <h1>
        <span>{headerSpan}</span>
        <br />
        {header}
      </h1>
      {children && <p className={`${!colorScheme && "light"}`}>{children}</p>}
    </>
  );
}
