import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

export default function Appointment(props) {
  // const { bookInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log("save::", save)
    // console.log("name::", name)
    // console.log("interviewer::", interviewer)
    // console.log("interview::", interview)
      // name:: helloo
      // interviewer:: 4
      // interview:: {student: 'helloo', interviewer: 4}

    // bookInterview(id, interview)
    props.bookInterview(props.id, interview)
  }

  // console.log("index.js >> Appointment >>props::", props);
    // {id: 4, time: '3pm', interview: null, interviewers: Array(5), bookInterview: ƒ, …}
      // bookInterview: ƒ bookInterview(id, interview)
      // id: 4
      // interview: null
      // interviewers: (5) [{…}, {…}, {…}, {…}, {…}]
      // time: "3pm"

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
        {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
    </article>
  );
};

// onSave={() => save(props.bookInterview(id, interview))}