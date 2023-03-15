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
import LoginGoogle2 from "./components/LoginGoogle2";
import Logout from "./components/Logout";
import { useEffect } from "react";
import {gapi} from 'gapi-script'

/* import ReactCalendar from "./components/ReactCalendar"; */

/* import { GoogleLogin } from "@react-oauth/google"; */

const clientId = "343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com"

function App() {

/*   useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope:"https://www.googleapis.com/auth/calendar.events"
      })
    };
    gapi.load('client:auth2', start)
   })
  
   var accessToken = gapi.auth.getToken().access_token; */

  return (
    <div className="App">
      <Navbar />
{/*       <LoginGoogle2 />
      <Logout /> */}

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
