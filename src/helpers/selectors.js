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

  // decontruct interview obj to get student and interviwer keys
  // interview: { student: "Chad Takahashi", interviewer: 2 }
  const { student, interviewer } = interview;

  // set up empty interviewObj, make student, interviewer keys to hold values 
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






// export function getInterview(state, interview) {
//   // returns an object with the interviewer data, null if no interview
//   if (!interview) {
//     return null;
//   }

//   // decontruct interview obj to get student and interviwer keys
//   // interview: { student: "Chad Takahashi", interviewer: 2 }
//   const { student, interviewer } = interview;

//   // set up empty interviewObj, make student, interviewer keys to hold values 
//   let interviewObj = {};
//   interviewObj.student = student;  
//   interviewObj.interviewer = state.interviewers[interviewer];
//   return interviewObj;

//   // need to return interview object with this form:
//     // {student: 'Chad Takahashi', interviewer: {…}}
//         // interviewer:
//           // avatar: "https://i.imgur.com/nPywAp1.jpg"
//           // id: 9
//           // name: "Lindsay Chu"
//           // [[Prototype]]: Object
//         // student: "Chad Takahashi"
// }

