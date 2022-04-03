import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"

// Our <InterviewerList> receives three props:

// interviewers:array - an array of objects as seen above

// setInterviewer:function - a function that accepts an interviewer id.
// This function will simply be passed down to the <InterviewerListItem>

// interviewer:number - a number that represents the id of the currently selected interviewer

export default function InterviewerList({value, interviewers, onChange}) {

  const interviewerItems = interviewers.map((interviewer) => {

    // will log for each interviewer
    // console.log("InterviewerListItem.js >interviewerItems >interviewer::", interviewer);

    // console.log("InterviewerListItem.js >interviewerItems >props::", props);
    // {interviewers: Array(5)}
    // {interviewers: Array(5), value: 3}
    // {interviewers: Array(5), onChange: ƒ}
      // 0: {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'}
      // 1: {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'}
      // 2: {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}
      // 3: {id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg'}
      // 4: {id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg'}
    

    // destructure props object to use value and onChange key words without props. infront
    // const {value, onChange} = props;
    // console.log("InterviewerListItem.js >interviewerItems >props:::::", value, onChange);
      // Initial >> undefined, undefined
      // Selected >> value=3, undefined
      // Clickable >> undefined, action() {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value.id} // NEED TO COMPARE WITH value.id, not just the value object
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