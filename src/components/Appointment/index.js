import React from "react";
import "./styles.scss";

export default function Appointment(props) {
  let message = ""
  const {time} = props

  if (time) {
    message = `Appointment at ${time}.`
  } else {
    message = "No Appointments."
  }

  return (
    <article className="appointment">
      {message}
    </article>
  )
};