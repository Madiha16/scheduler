import React from 'react';
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"
import PropTypes from 'prop-types';

// will check if interviewers is being passed in as an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

function InterviewerList({value, interviewers, onChange}) {
  const interviewerItems = interviewers.map((interviewer) => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
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

export default InterviewerList;