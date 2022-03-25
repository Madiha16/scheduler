import React from "react";

export default function DayListItem(props) {

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

// // CORRECT!
// function MyComponent(props) {
//   const a = 1;
//   const b = 2;
//   return (
//     <div>
//       <h1 onClick={() => props.doStuff(a,b)}>Click Me to Do Stuff</h1>
//     </div>
//   )
// }

// Use the onClick event handler to handle the click event that sets the day.
// Remember that when we use setDay, we need to pass it the name of the day.

// We know that this component takes in three attributes (name, spots, selected) and one action (setDay) as
// props, so we'll need to update our DayListItem component to reflect this after building our stories.