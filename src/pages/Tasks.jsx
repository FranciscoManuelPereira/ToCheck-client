import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/* import taskService from "../services/task.service"; */

function Tasks() {

      //CONNECT THE API CALENDAR
/*  const gapi = window.gapi;
  const CLIENT_ID =
    "343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAbrGkakOvFnYK_p8ATm0YXvbs6UpuHzW8";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {  */

  // Refer to the JavaScript quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.

  /* var event = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: "2015-05-28T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2015-05-28T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });  */

  //WHAT WAS ON DOCUMENTATION
/* request.execute(function (event) {
            appendPre("Event created: " + event.htmlLink);
          });  */
  //WHAT WAS ON HIS PAGE
/*  request.execute((event) => {
            window.open(event.htmlLink);
          }); 
           });
    });
  };   */
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

/*   gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 20,
    'orderBy': 'startTime'
  }).then(response => {
    const events = response.result.items
    console.log('EVENTS: ', events)
  }) */
 
  return (
    <section>
      <h1>Tasks</h1>
      {/* <button onClick={handleClick}>Add Task on Google Calendar</button>
      <a 
      className='App-Link'
      href='https://reactjs.org'
      target='_blank'
      rel='noopener noreferrer'
     >Learn React</a>  */}
      {tasks.map((task) => {
        return (
          <Link to={`/tasks/edit/${task._id}`} key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.date}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default Tasks;
