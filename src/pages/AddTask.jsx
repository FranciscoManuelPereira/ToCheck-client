import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/* import taskService from "../services/task.service";
import { AuthContext } from "../context/auth.context"; */
import axios from "axios";
import moment from "moment";
import "../pages/addtask.css";

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
    <section className="sectionAddTask">
      <div className="addTaskDiv">
        <div className="titlesDiv">
          <h1>New things to do?</h1>
          <div className="subtitleAddTask">Let's GO!! Add it below </div>
          <h3>{selectedDay}</h3>
        </div>
        <div>
          <form className="formA" onSubmit={handleSubmit}>
            <label className="label" htmlFor="title">
              What do we have new?
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitle}
            />

            <label className="label" htmlFor="description">
              Additional Notes
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={handleDescription}
            />

            <label className="label" htmlFor="status">
              Tell me the status
            </label>
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

            <label className="label" htmlFor="importance">
              Is it important?
            </label>
            <select
              name="importance"
              id="importance"
              onChange={handleImportance}
              value={importance}
            >
              <option value="High Priority" name="High Priority">
                YEAH!!
              </option>
              <option value="Important" name="Important">
                Important
              </option>
              <option value="Normal" name="Normal">
                Normal
              </option>
            </select>

            <label className="label" htmlFor="date">
              Hour
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={time}
              onChange={handleDate}
            />

            <button type="submit">Let's do THIS!</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddTask;
