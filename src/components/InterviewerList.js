import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"

// Our <InterviewerList> receives three props:

// interviewers:array - an array of objects as seen above

// setInterviewer:function - a function that accepts an interviewer id.
// This function will simply be passed down to the <InterviewerListItem>

// interviewer:number - a number that represents the id of the currently selected interviewer

export default function InterviewerList({value, interviewers, onChange}) {
  // console.log("value:", value);
  const interviewerItems = interviewers.map((interviewer) => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        // no... value is a number, not an object!
        // value is a prop being passed from Form component which will either:
        // 1) be null if creating a new appointment
        // 2) be set on line 8 from props.interviewer from Appointment component when editing a pre-exiitng appointment (won't be null)
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  })

  return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewerItems}</ul>
      </section>
  );

}