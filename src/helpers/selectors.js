export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const getDayObj = state.days.find(dayObj => dayObj.name === day)

  if (!getDayObj) {
    return [];
  }

  return getDayObj.appointments.map(id => state.appointments[id])

}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const { student, interviewer } = interview;

  let interviewObj = {};
  interviewObj.student = student;  
  interviewObj.interviewer = state.interviewers[interviewer];
  return interviewObj;
}




export function getInterviewersForDay(state, day) {
  //... returns an object of interviewers for that day

  // find day object from state.days array of day objects
  const getDayObj = state.days.find(dayObj => dayObj.name === day)
  // console.log("getDayObj:", getDayObj)

  // if day not found return empty array (or if days data is empty)
  if (!getDayObj) {
    return [];
  }

  // get the array of interviewers day object 
  const interviwerIds = getDayObj.interviewers
  // console.log("interviwerIds:", interviwerIds)

  // use map on array of interviwers id's to get their object info from state.interviwers
  // console.log("interviwerIds.map:", interviwerIds.map(id => state.interviewers[id]))
  return interviwerIds.map(id => state.interviewers[id])

}