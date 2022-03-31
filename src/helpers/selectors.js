export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const getDayObj = state.days.find(dayObj => dayObj.name === day)

  if (!getDayObj) {
    return [];
  }

  return getDayObj.appointments.map(id => state.appointments[id])

}