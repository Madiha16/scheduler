import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = function(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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
        interviewers: all[2].data }));
    })
  }, []);


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
  }

  return { state, setDay, bookInterview, cancelInterview };
}


export default useApplicationData;


// Create a new file hooks/useApplicationData.js and move the logic used to manage the state from the components/Application.js into it.

// Our useApplicationData Hook will return an object with four keys:

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.