import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("state::", state, "state.day::", state.day, "dailyAppointments::", dailyAppointments)
    // appointments: {1: {…}, 2: {…}, 3: {…}, 4: {…}, 5: {…}, 6: {…}, 7: {…}, 8: {…}, 9: {…}, 10: {…}, 11: {…}, 12: {…}, 13: {…}, 14: {…}, 15: {…}, 16: {…}, 17: {…}, 18: {…}, 19: {…}, 20: {…}, 21: {…}, 22: {…}, 23: {…}, 24: {…}, 25: {…}}
      //     1:
      // id: 1
      // interview: null
      // time: "12pm"
      // [[Prototype]]: Object
      // 2: {id: 2, time: '1pm', interview: {…}}
    // day: "Monday"
    // days: (5) [{…}, {…}, {…}, {…}, {…}]
        //     0: {id: 1, name: 'Monday', appointments: Array(5), interviewers: Array(5), spots: 2}
        // 1:
        // appointments: (5) [6, 7, 8, 9, 10]
        // id: 2
        // interviewers: (5) [3, 5, 7, 8, 10]
        // name: "Tuesday"
        // spots: 4
        // [[Prototype]]: Object
        // 2: {id: 3, name: 'Wednesday', appointments: Array(5), interviewers: Array(5), spots: 2}
    // interviewers: {data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
        //     interviewers:
        // config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
        // data: {1: {…}, 2: {…}, 3: {…}, 4: {…}, 5: {…}, 6: {…}, 7: {…}, 8: {…}, 9: {…}, 10: {…}}
        // headers: {access-control-allow-origin: '*', content-length: '781', content-type: 'application/json; charset=utf-8', date: 'Thu, 31 Mar 2022 10:56:29 GMT', etag: 'W/"30d-3H0+hNLeoDR8/s+XemQgOCUbXbg"', …}
        // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
        // status: 200
        // statusText: "OK"

  // state.day
    // Monday
  // dailyAppointments
    // 0: Array(5)
      // 0: {id: 1, time: '12pm', interview: null}
      // 1: {id: 2, time: '1pm', interview: {…}}
      // 2: {id: 3, time: '2pm', interview: {…}}
      // 3: {id: 4, time: '3pm', interview: null}
      // 4:
      // id: 5
      // interview: {student: 'Jamal Jordan', interviewer: 8}
      // time: "4pm"

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
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2] }));
      // console.log("all0:", all[0]); // days data
      // console.log("all0.d:",all[0].data); // days ARRAY

      // console.log("all1:", all[1]); // appointments
      // console.log("all1.d:", all[1].data); // appointments OBJECT

      // console.log("all2:", all[2]); // interviewers data
      // console.log("all2.d:", all[2].data); // interviewers OBJECT
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