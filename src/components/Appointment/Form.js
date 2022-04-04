import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // const [student, interviewer, interviewers, onCancel, onSave] = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  // reset() function to the Form component that calls setStudent("") and setInterviewer(null).
  const reset = function() {
    setStudent("");
    setInterviewer(null);
    return
  }

  // Add a cancel function to the <Form> component that calls reset() and props.onCancel.
  // We should also update our Form component so it's called when a user clicks the Cancel button.
  const cancel = () => {
    reset();
    props.onCancel();
    return
  }
  
  console.log("Form.js >> props::", props);
  // {interviewers: Array(5), onSave: ƒ, onCancel: ƒ}
  //   interviewers: (5) [{…}, {…}, {…}, {…}, {…}]
  //   onCancel: ƒ ()
  //   onSave: ƒ save(name, interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          /* your code goes here */
          value={interviewer}
          interviewers={props.interviewers.toString()}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};