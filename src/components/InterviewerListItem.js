import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  console.log("InterviewerListItem >props::", props)
    // {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png', selected: true}
    // {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png', setInterviewer: ƒ}
  
  return (
    <li onClick={() => props.setInterviwer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}

// Add an event handler to the <li>.
// As mentioned above, each <InterviewerListItem> should be clickable. When clicked,
// the setInterviewer function should run, taking the interviewer id as a parameter.

// Recall that we implemented a similar thing in the <DayListItem>.