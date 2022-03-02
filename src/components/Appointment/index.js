import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  // let message = ""
  // const {time} = props

  // if (time) {
  //   message = `Appointment at ${time}.`
  // } else {
  //   message = "No Appointments."
  // }

  return (
    <article className="appointment" >
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/>: <Empty />}

    </article>
  )
};