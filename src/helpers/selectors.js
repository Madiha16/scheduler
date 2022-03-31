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