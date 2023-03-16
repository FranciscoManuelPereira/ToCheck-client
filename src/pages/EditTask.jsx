import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function EditTask({ selectedTask, getTasks }) {
  const [title, setTitle] = useState(selectedTask.title);
  const [description, setDescription] = useState(selectedTask.description);
  const [status, setStatus] = useState("");
/*   const [commentDescription, setcommentDescription] = useState(""); */

  const [importance, setImportance] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleStatus = (e) => setDescription(e.target.value);
  const handleImportance = (e) => setDescription(e.target.value);
/*   const handleCommentDescription = (e) => setcommentDescription(e.target.value); */

  const navigate = useNavigate();

  //const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  /*   const getTask = async () => {
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
  }; */

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${selectedTask._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  /*   useEffect(() => {
    getTask();
  }, []); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* const id = e.id; */
    const body = { title, description, status, importance };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${selectedTask._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }

/*     const handleCommentDescription = async (e) => {
      e.preventDefault();
      const body = { description };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/comments/${selectedTask._id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
 
        );
        const newComment = response.data; // assuming the server returns the newly created comment
        setSelectedTask((prevTask) => ({
          ...prevTask,
          comments: [...prevTask.comments, newComment],
        }));
      } catch (err) {
        console.error(err);
      }
    };
  } */

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
{/* 
        <h2>Comments</h2> */}
        {/*       {task && */}
 {/*        <form onSubmit={handleCommentDescription}>
          <label htmlFor="description">Comment Description</label>
          <input
            type="description"
            name="description"
            id="description"
            value={description}
            onChange={handleCommentDescription}
          />
        </form> */}

        {/*       {task && <Link to={`/projects/edit/${project._id}`}> Edit project </Link>} */}

        <button onClick={deleteTask}>Delete</button>
      </section>
    );
}

export default EditTask;
