import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js";
// import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];




export default function Application(props) {
    // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  //Replacing all the above individual states with the following: 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("days from state: ",state.days)
  console.log("appointments from state: ",state.appointments);

  //Add the line below:
  let dailyAppointments = getAppointmentsForDay(state, state.day);


  //This function will set the day inside the useState above
  const setDay = day => {
    return setState({ ...state, day })};

  // setState(prev => ({ ...prev, days }));
  // const setDays = (days) => {
    //... your code here ...
  //   setState(prev => setState({...prev, days}));
  // }

  useEffect(()=>{
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    //The below get request is for one API end point:
    // axios.get(dayURL).then(response =>{
    //   console.log(response.data)
    //   setDays([...response.data]);
    // })
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) =>{
      // console.log("first promise resolved:",all[0]);
      // console.log("second promise resolved:" ,all[1].data);
      // console.log("all the promises:", all);
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);

    //function to book an interview
    function bookInterview(id, interview) {
      // console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  

  
      const url =`http://localhost:8001/api/appointments/${id}`;
  
      //to save the data to the end API
      let req={
        url,
        method: 'PUT',
        data: appointment
      }
      return axios(req).then(response => {
        console.log("response from axios put=====>", response.data);
        setState({...state, appointments})
      })
  
  
  
    }

      //function to cancel the interview
    function cancelInterview(id){
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const url =`http://localhost:8001/api/appointments/${id}`;

      let req={
        url,
        method: 'DELETE',
        data:appointment
      }
      return axios(req).then(response =>{
        console.log("response from delete axios===>",response);
        setState({...state, appointments});
      })
    }

  //get the daily appointemnts from the the helper function
  //  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //  console.log("daily appointments:", dailyAppointments);
  let appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state,state.day)
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}

    />
  );
});


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/*dailyAppointments.map(appointment =>{
          // return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
          //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
          return <Appointment key={appointment.id} {...appointment} />
        })*/}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
