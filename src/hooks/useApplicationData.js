import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  //This function will set the day inside the useState above
  const setDay = day => {
    return setState({ ...state, day })
  };

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
        // console.log("response from axios put=====>", response.data);
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

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }




} 