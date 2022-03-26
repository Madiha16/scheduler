import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function() {
    if (props.spots === 0) {
      return "no spots remaining"
    }
    if (props.spots === 1) {
      return "1 spot remaining"
    }
    return `${props.spots} spots remaining`
  }
  // Could have also used a chained ternary operator within the returned <h3>

  // console.log("DayListItem.js >dayClass::", dayClass);
    // in localhost8000
    // day-list__item day-list__item--selected
    // day-list__item
    // day-list__item day-list__item--full
  // console.log("DayListItem.js >props::", props)
    // in localhost8000
    // {name: 'Monday', spots: 2, selected: true, setDay: ƒ}
    // {name: 'Tuesday', spots: 5, selected: false, setDay: ƒ}
    // {name: 'Wednesday', spots: 0, selected: false, setDay: ƒ}

    // Unselected -> {name: 'Monday', spots: 5}
    // Selected -> {name: 'Monday', spots: 5, selected: true}
    // Clickable -> props:: {name: 'Tuesday', spots: 5, setDay: ƒ}

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}