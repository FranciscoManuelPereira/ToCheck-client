import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [importance, setImportance] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleStatus = (e) => setDescription(e.target.value);
  const handleImportance = (e) => setDescription(e.target.value);

  const navigate = useNavigate();

  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const getTask = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setTitle(response.data.title);
      setDescription(response.data.description);
      setStatus(response.data.status);
      setImportance(response.data.importance);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }}
      );
      console.log(response);

      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, status, importance };
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      navigate(`/tasks`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Edit Task:</h1>
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

        <label htmlFor="status">Update status:</label>
        <select
          name="status"
          id="status"
          onChange={handleStatus}
          value={status}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {/*         <input
          type="text"
          name="status"
          id="status"
          value={status}
          
        /> */}

        <label htmlFor="importance">Update Importance:</label>
        <select
          name="importance"
          id="importance"
          onChange={handleImportance}
          value={importance}
        >
          <option value="highPriority">High Priority</option>
          <option value="important">Important</option>
          <option value="normal">Normal</option>
        </select>

        <button type="submit">Edit task</button>
      </form>

      <button onClick={deleteTask}>Delete</button>
    </section>
  );
}

export default EditTask;
