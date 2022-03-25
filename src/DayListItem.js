import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  // USE FULL CLASS NAME (day-list__item--selected)

  console.log("dayClass::", dayClass);
  console.log("props::", props)
  // Unselected -> {name: 'Monday', spots: 5}
  // Selected -> {name: 'Monday', spots: 5, selected: true}
  // Clickable -> props:: {name: 'Tuesday', spots: 5, setDay: ƒ}

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

// Instruction
// Give classes to the <li> in DayListItem by passing a variable called dayClass to className.
// Use the classnames library to conditionally apply the correct classes based on the following rules:

// day-list__item all the time
// day-list__item--selected class name if props.selected is true
// day-list__item--full class name if props.spots is 0.