import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  // const { bookInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  function onDelete(id) {
    // const interview = {
    //   student: name,
    //   interviewer
    // };
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  function onEdit(id) {
    transition(SHOW);
  }

  console.log("index.js >> Appointment >>props::", props);
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
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
        {mode === SAVING && <Status message={"Saving..."} />}
        {mode === DELETING && <Status message={"Deleting..."} />}
    </article>
  );
};

// onSave={() => save(props.bookInterview(id, interview))}