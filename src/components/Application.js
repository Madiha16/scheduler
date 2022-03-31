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
  console.log("state.interviewers::", state.interviewers.data);
    // {1: {…}, 2: {…}, 3: {…}, 4: {…}, 5: {…}, 6: {…}, 7: {…}, 8: {…}, 9: {…}, 10: {…}}
    // 1: {id: 1, name: 'Sylvia Palmer', avatar: 'https://i.imgur.com/LpaY82x.png'}
    // 2: {id: 2, name: 'Tori Malcolm', avatar: 'https://i.imgur.com/Nmx0Qxo.png'}
    // 3: {id: 3, name: 'Mildred Nazir', avatar: 'https://i.imgur.com/T2WwVfS.png'}
    // 4: {id: 4, name: 'Cohana Roy', avatar: 'https://i.imgur.com/FK8V841.jpg'}
    // 5: {id: 5, name: 'Sven Jones', avatar: 'https://i.imgur.com/twYrpay.jpg'}
    // 6: {id: 6, name: 'Susan Reynolds', avatar: 'https://i.imgur.com/TdOAdde.jpg'}
    // 7: {id: 7, name: 'Alec Quon', avatar: 'https://i.imgur.com/3tVgsra.jpg'}
    // 8: {id: 8, name: 'Viktor Jain', avatar: 'https://i.imgur.com/iHq8K8Z.jpg'}
    // 9: {id: 9, name: 'Lindsay Chu', avatar: 'https://i.imgur.com/nPywAp1.jpg'}
    // 10: {id: 10, name: 'Samantha Stanic', avatar: 'https://i.imgur.com/okB9WKC.jpg'}
    // [[Prototype]]: Object

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