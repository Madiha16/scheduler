import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  // console.log(buttonClass);
  // button
  // button button--confirm
  // button button--danger

  // console.log("props:", props)
  // // {children: 'Clickable', onClick: ƒ}
  // //   children: "Clickable"
  // //   onClick: ƒ action()
 
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