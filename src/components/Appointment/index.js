import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const { interview } = props;
  // console.log("index.js >> Appointment >>props::", props);
    // {id: 1, time: '4pm'}

  return (
    <article className="appointment">
      <Header time={props.time} />
        {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    </article>
  );
};

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render
// the <Show> component, else it should render the <Empty> component.

// Note
// Using ternary operator version of conditional rendering makes the most sense in
// this case where we want to render <Show> or <Empty> based on props.interview.