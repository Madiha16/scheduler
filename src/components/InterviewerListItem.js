import React from "react";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  // console.log("InterviewerListItem >props::", props)
  //   {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png', selected: true}
  
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}