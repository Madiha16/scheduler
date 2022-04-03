import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("state::", state, "state.day::", state.day, "dailyAppointments::", dailyAppointments);

  const interviewers = getInterviewersForDay(state, state.day)
  // console.log("state::", state, "state.day::", state.day, "interviewers::", interviewers);

  function bookInterview(id, interview) {
    // console.log(id, interview);
    // console.log("book interview function called with id, interview values!")

    const appointment = {
      // going through all aptmts, get the one at [id]
      ...state.appointments[id],
      // override the interview
      interview: { ...interview }
    };

    // create new apt obj
    const appointments = {
      // get all the aptmts from state, spread them out
      ...state.appointments,
      // override the appointment with [id]
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log("axios put sent");
        // setState({...state, appointments})
        // When the response comes back we update the state using the existing setState
        // Transition to SHOW when the promise returned by props.bookInterview resolves. 
        setState(prev => ({...prev, appointments }));
      })
      
      // This was stopping error from reaching the returned promise in index.js Appointment component (destroy func)
      // You can THROW an error to pass it into the next chain block if you need to

      // .catch((error) => {
      //   console.log("Error in put request (saving appointment):", error)
      // });

  }

  function cancelInterview(id) {
    // console.log("we need to delete this interview::", id);

    const appointment = {
      // going through all aptmts, get the one at [id]
      ...state.appointments[id],
      // override the interview
      interview: null
    };

    // create new apt obj
    const appointments = {
      // get all the aptmts from state, spread them out
      ...state.appointments,
      // override the appointment with [id]
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // console.log('axios.delete successful');
        setState(prev => ({...prev, appointments }));
      })

      // This was stopping error from reaching the returned promise in index.js Appointment component (destroy func)
      // You can THROW an error to pass it into the next chain block if you need to

      // .catch((error) => {
      //   console.log("Error deleting appointment:", error)
      // });
  }



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // Now that we can access the data for days and appointments we need to update both in our state at the same time.
      // Update the effect to set the days and appointments state at the same time.
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data }));
      // console.log("all0.d:",all[0].data); // days ARRAY
      // console.log("all1.d:", all[1].data); // appointments OBJECT
      // console.log("all2.d:", all[2].data); // interviewers OBJECT
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* Map over appointments array in section tag (instead of saving to a variable) */}
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);

          // console.log("Application >interview::", interview);
          // gives object with student, interviewer (undefined)
          // console.log("Application >appointment::", appointment);


          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}