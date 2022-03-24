import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }

  if (props.danger) {
    buttonClass += " button--danger";
  }

  if (props.danger) {
    buttonClass += " button--danger";
  }

  console.log("props:", props)
  // {children: 'Clickable', onClick: ƒ}
  //   children: "Clickable"
  //   onClick: ƒ action()
 
  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}