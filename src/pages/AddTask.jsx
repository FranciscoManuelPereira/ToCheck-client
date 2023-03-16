import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/* import taskService from "../services/task.service";
import { AuthContext } from "../context/auth.context"; */
import axios from "axios";
import moment from "moment";

function AddTask({ day, getTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [importance, setImportance] = useState("High Priority");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  /* const [comments, setComments] = useState(""); */

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleImportance = (e) => setImportance(e.target.value);
  const handleDate = (e) => {
    //split hours and minutes
    //13:26
    //[13, 26]
    const hours = e.target.value.split(":")[0];
    const minutes = e.target.value.split(":")[1];
    const fullDate = moment(day).add(hours, "h").add(minutes, "m").toDate();
    console.log(fullDate);
    setDate(fullDate);
    setTime(e.target.value);
  };
  /*   const handleComments = (e) => setComments(e.target.value);
   */
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const selectedDay = moment(day).format("D/M");
  console.log(selectedDay);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, status, importance, date };
      const a = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      /* await taskService.createTask({
        title,
        description,
        status,
        importance,
        date,
        comments,
      }); */
      /* console.log("aaaaa"); */

      setTitle("");
      setDescription("");
      setStatus("");
      setImportance("");
      setDate("");
      getTasks();
      console.log("a", a);
    } catch (error) {
      console.log("a", error);
    }
  };

  return (
    <section>
      <h1>Create Task:</h1>
      <h3>{selectedDay}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
        />

        <label htmlFor="status">Select the status:</label>
        <select
          name="status"
          id="status"
          onChange={handleStatus}
          value={status}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {/*         <input
          type="text"
          name="status"
          id="status"
          value={status}
          
        /> */}

        <label htmlFor="importance">Importance:</label>
        <select
          name="importance"
          id="importance"
          onChange={handleImportance}
          value={importance}
        >
          <option value="High Priority" name="High Priority">
            High Priority
          </option>
          <option value="Important" name="Important">
            Important
          </option>
          <option value="Normal" name="Normal">
            Normal
          </option>
        </select>

        <label htmlFor="date">Hour</label>
        <input
          type="time"
          name="time"
          id="time"
          value={time}
          onChange={handleDate}
        />

        <button type="submit">Create task</button>
      </form>
    </section>
  );
}

export default AddTask;
