import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });

  // console.log("Application.js >> day, props::", day, props, Object.values(appointments))

  // We are going to make a request to both endpoints at the same time.
  // When both have returned their data, we need to update both parts of the state at the same time.
  // We will use Promise.all to make both requests before updating the state.
  // We'll pass Promise.all an array of promises. When all promises have resolved, we will receive an array
  // of resolved values matching the order of the array passed to Promise.all.
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // Now that we can access the data for days and appointments we need to update both in our state at the same time.
      // Update the effect to set the days and appointments state at the same time.
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2] }));
      console.log("all0:", all[0]); // days data
      console.log("all0.d:",all[0].data); // days ARRAY

      console.log("all1:", all[1]); // appointments
      console.log("all1.d:", all[1].data); // appointments OBJECT

      console.log("all2:", all[2]); // interviewers data
      console.log("all2.d:", all[2].data); // interviewers OBJECT
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, []);
  // Could have saved returned promises to an array like Andy did
  // then save each response to a variable:

  // const promises = [recipePromise, ingredientPromise];

  // Promise.all(promises)
  //   .then((responseArr) => {
  //     // console.log(responseArr);
  //     const recipeResponse = responseArr[0];
  //     setRecipes(recipeResponse.data);

  //     setIngredients(responseArr[1].data);
  //   });


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