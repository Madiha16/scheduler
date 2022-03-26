import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  // const formatName = function() {
  //   if (props.selected) {
  //     return props.name
  //   }
  // };

  console.log("InterviewerListItem >props::", props)
    // {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png', selected: true}
    // {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png', setInterviewer: ƒ}
  
  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
      {/* better to use && vs ternary operator with props.name and empty string*/}
    </li>
  );
}

// Add an event handler to the <li>.
// As mentioned above, each <InterviewerListItem> should be clickable. When clicked,
// the setInterviewer function should run, taking the interviewer id as a parameter.

// Recall that we implemented a similar thing in the <DayListItem>.