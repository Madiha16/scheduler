export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  // make array of day objects from state.days
  // const daysArr = state.days;

  // // check if day param is same as day pbject's name in daysArr, save it's id it matches
  // let appointementsIdArr = [];
  // for (const dayObj of daysArr) {
  //   if (dayObj.name === day) {
  //     // console.log(dayObj.appointments)
  //     appointementsIdArr = dayObj.appointments;
  //   }
  // }

  // const found = array1.find(element => element > 10);

  // return day Object
  const found = state.days.find(dayObj => dayObj.name === day)

  if (!found) {
    return [];
  }


  // pass a function to map
  // const map1 = array1.map(x => x * 2);

  return found.appointments.map(id => state.appointments[id])


  // // if appointments id array doesn't contain any days, return empty array
  // if (appointementsIdArr.length === 0) {
  //   return [];
  // }
  

  // // make an appointments object from state.appointments
  // const aptObj = state.appointments;

  // // loop though each appintment object in aptObj, and appintment's id array
  // // if id's match, push that appointment object into aptObjArr
  // const aptObjArr = [];
  // for (const apt in aptObj) {
  //   for (const ID of appointementsIdArr) {
  //     if (aptObj[apt].id === ID) {
  //       aptObjArr.push(aptObj[ID])
  //     }
  //   }
  // }

  // return aptObjArr

}