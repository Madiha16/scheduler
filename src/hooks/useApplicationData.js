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

  const updateSpots = function (state, appointments, id) {

    // Get the day Object
    const dayObj = state.days.find(day => day.name === state.day);
    
    // get the array of appintment id's
    const aptIdArr = dayObj.appointments;

    // if the interview is null in appointments object at id, put it into an array
    const nullAptArr = aptIdArr.filter( (id) => !appointments[id].interview);

    // spots are equal to the length of the null appointment array's length
    const spots = nullAptArr.length;
    // console.log("spots=", spots);

    // set day equal to spread of dayObj, update spots
    const day = {...dayObj, spots };
    
    const newDays = state.days.map(d => d.name === state.day? day : d);
    
    // return days array
    return newDays;
  };

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
        const days = updateSpots(state, appointments, id);
        // setState({...state, appointments})
        // When the response comes back we update the state using the existing setState
        // Transition to SHOW when the promise returned by props.bookInterview resolves. 
        setState(prev => ({...prev, appointments, days }));
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

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // console.log('axios.delete successful');
        setState(prev => ({...prev, appointments, days }));
      })
  }

  console.log("state:", state, "setDay:", setDay, "bookInterview:", bookInterview, "cancelInterview:", cancelInterview)

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;