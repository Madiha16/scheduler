import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

export default function Appointment(props) {
  // const { interview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("index.js >> Appointment >>props::", props);
    // {id: 4, time: '3pm', interview: {…}}
      // id: 4
      // interview:
      // interviewer: 3
      // student: "Archie Cohen"

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    </article>
  );
};

// All <Appointment> components will render a <Header> that takes in a time prop.
// If props.interview (an interview object) is truthy the <Appointment> will render
// the <Show> component, else it should render the <Empty> component.

// Note
// Using ternary operator version of conditional rendering makes the most sense in
// this case where we want to render <Show> or <Empty> based on props.interview.