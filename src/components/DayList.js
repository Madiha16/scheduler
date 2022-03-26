import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {

  // console.log("props in DayList::", props)
  // {days: Array(3), day: 'Tuesday', setDay: ƒ}
    //   day: "Tuesday"
    //   days: Array(3)
      //   0: {id: 1, name: 'Monday', spots: 2}
      //   1: {id: 2, name: 'Tuesday', spots: 5}
      //   2: {id: 3, name: 'Wednesday', spots: 0}
      //   length: 3
      //   [[Prototype]]: Array(0)
    //   setDay: ƒ action()
    //   [[Prototype]]: Object

  const dayItems = props.days.map((day) => {

    // will log for each day
    console.log("day variable in dayItems func::", day);
    // day variable in dayItems func:: 
    // {id: 2, name: 'Tuesday', spots: 5}
    //   id: 2
    //   name: "Tuesday"
    //   spots: 5
    //   [[Prototype]]: Object

    // console.log("props in dayItems func::", props);
    // same as props logged outside on dayItems func in DayList

    return (
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />

    );
  })

  return (
    <ul>{dayItems}</ul>
  );
}

// As we map over the days array, we can check to see if the day that is selected matches the name
// of the day in the object we are currently processing.

// Instruction
// Within the <DayList> component, map over the days array to return <DayListItem> components as children.
// Remember to import the <DayListItem> component into <DayList>.