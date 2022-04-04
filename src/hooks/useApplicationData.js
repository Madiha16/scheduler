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
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data }));
    })
  }, []);


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState(prev => ({...prev, appointments, days }));
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({...prev, appointments, days }));
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;