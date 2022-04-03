import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  // const { bookInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then((res) => {
        if (res) transition(SHOW)
        else {
          transition(ERROR_SAVE, true)
        }
      })
      .catch((error) => {
        transition(ERROR_SAVE, true)
        console.log("Error in save func:", error)
      });
  }

  function destroy() {

    transition(DELETING, true)

    props
      .cancelInterview(props.id)
      .then((res) => {
        if (res) transition(EMPTY)
        else {
          transition(ERROR_DELETE, true)
        }
      })
      .catch((error) => {
        transition(ERROR_DELETE, true)
        console.log("Error in destroy func:", error)
      });
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
        {mode === SAVING && <Status message="Saving..." />}
        {mode === DELETING && <Status message="Deleting..." />}
        {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={destroy} onCancel={back} />}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === ERROR_SAVE && <Error message="Error. Unable to book appointment" />}
        {mode === ERROR_DELETE && <Error message="Error. Unable to delete appointment" />}
    </article>
  );
};