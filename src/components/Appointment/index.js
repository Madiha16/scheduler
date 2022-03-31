import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const { interview } = props;
  // console.log("index.js >> Appointment >>props::", props);
    // {id: 1, time: '4pm'}

    // index.js >> Appointment >>props:: {time: '5pm'}
    // index.js:9 index.js >> Appointment >>props:: {id: 1, time: '12pm', interview: null}
    // index.js:9 index.js >> Appointment >>props:: {id: 2, time: '1pm', interview: {…}}
    // index.js:9 index.js >> Appointment >>props:: {id: 3, time: '2pm', interview: {…}}
    // index.js:9 index.js >> Appointment >>props:: {id: 4, time: '3pm', interview: null}
    // index.js:9 index.js >> Appointment >>props:: {id: 5, time: '4pm', interview: {…}}
    // index.js:9 index.js >> Appointment >>props:: {time: '5pm'}

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