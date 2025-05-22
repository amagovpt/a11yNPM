import React from "react";
import "./fontStyle.css";
import "./icon.css";

const Icon = ({ name, darkTheme, description }) => {
  const theme = darkTheme === "dark" ? "dark" : ""
  
  return <i className={`icon-${name} ${theme}`} aria-hidden="true"  title={description}></i>;
};

export { Icon };
