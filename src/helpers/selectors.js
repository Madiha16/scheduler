export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const getDayObj = state.days.find(dayObj => dayObj.name === day)

  if (!getDayObj) {
    return [];
  }

  return getDayObj.appointments.map(id => state.appointments[id])

}

export function getInterview(state, interview) {
  // returns an object with the interviewer data, null if no interview
  if (!interview) {
    return null;
  }

  let interviewerID = interview.interviewer;

  return {
    student: interview.student,
    interviewer: {...state.interviewers[interviewerID]}
  }
}

export function getInterviewersForDay(state, day) {
  //... returns an object of interviewers for that day

  // find day object from state.days array of day objects
  const getDayObj = state.days.find(dayObj => dayObj.name === day)

  // if day not found return empty array (or if days data is empty)
  if (!getDayObj) {
    return [];
  }

  // get the array of interviewers day object 
  const interviwerIds = getDayObj.interviewers

  // use map on array of interviwers id's to get their object info from state.interviwers
  return interviwerIds.map(id => state.interviewers[id])

}