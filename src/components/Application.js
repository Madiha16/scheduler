import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("state::", state, "state.day::", state.day, "dailyAppointments::", dailyAppointments);

  const setDay = day => setState({ ...state, day });

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
        interviewers: all[2] }));
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
          
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}