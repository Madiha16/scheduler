import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"

// Our <InterviewerList> receives three props:

// interviewers:array - an array of objects as seen above

// setInterviewer:function - a function that accepts an interviewer id.
// This function will simply be passed down to the <InterviewerListItem>

// interviewer:number - a number that represents the id of the currently selected interviewer

export default function InterviewerList(props) {

  const interviewerItems = props.interviewers.map((interviewer) => {

    // will log for each interviewer
    // console.log("InterviewerListItem.js >interviewerItems >interviewer::", interviewer);

    // console.log("InterviewerListItem.js >interviewer.id::", interviewer.id);

    return (
      <InterviewerListItem
        key={interviewer.id}
        // need to pass down the id! interviewer id!
        // id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        // this is passing down the setInterviewer function
        // setInterviewer={props.setInterviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
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