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

  let obj = {};

  // console.log("interviewer::", interviewer)// 2
  // console.log("student:", student)//student: Archie Cohen
  // const id = interviewer;
  // console.log("id::", id, "student:", student)//student: Archie Cohen

  obj.student = student;  
  obj.interviewer = state.interviewers[interviewer];
  // console.log("obj::", obj,)
  return obj;
}