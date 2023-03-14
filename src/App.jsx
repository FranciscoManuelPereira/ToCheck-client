/* import { useState } from "react"; */
import "./App.css";
import { Routes, Route } from "react-router-dom";
/* import { useEffect } from "react"; */
import Navbar from "./components/Navbar";
import Private from "./components/Private";
import AddTask from "../src/pages/AddTask";
import EditTask from "../src/pages/EditTask";
import Homepage from "../src/pages/Homepage";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Tasks from "../src/pages/Tasks";
/* import ReactCalendar from "./components/ReactCalendar"; */



/* import { GoogleLogin } from "@react-oauth/google"; */

function App() {
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
        .then(() => { */

  // Refer to the JavaScript quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.

  /*  var event = {
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
          }); */

  //WHAT WAS ON DOCUMENTATION
  /* request.execute(function (event) {
            appendPre("Event created: " + event.htmlLink);
          }); */
  //WHAT WAS ON HIS PAGE
  /* request.execute((event) => {
            window.open(event.htmlLink);
          }); */
  /*         });
    });
  }; */


  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/tasks"
          element={
            <Private>
              <Tasks />
            </Private>
          }
        />
        {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
