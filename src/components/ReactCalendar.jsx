import React, { useState, useRef, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import AddTask from "../pages/AddTask";
import Tasks from "../pages/Tasks";
import EditTask from "../pages/EditTask";
import { AuthContext } from "../context/auth.context";
import Button from "@mui/material/Button";
import { Drawer } from "@mui/material";

function ReactCalendar() {
  const { setAuthContex, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [state, setState] = useState({
    top: false,
  });

  //calendar functionality
  const calendarRef = useRef(null);
  /*   const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: '2023-03-15T10:00:00',
      end/* : '2023-03-15T12:00:00',
    },
    {
      title: 'Event 2',
      start: '2023-03-16T14:00:00',
      end: '2023-03-16T16:00:00',
    },
  ]); */

  /*   const handleEventAdd = (task) => { //CHAT
    setEvents([...task, event]);
  };  */

  const onTaskAdded = async (e) => {
    const title = e.title;
    const description = e.description;
    const date = moment(e.start).toDate();
    const body = { title, description, date };
    try {
      const a = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

  const onTaskEdited = async (e) => {
    const title = e.title;
    const description = e.description;
    const date = moment(e.start).toDate();
    const id = e.id;
    const body = { id, title, description, date };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setSelectedTask(null);
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

  const onTaskDeleted = async (e) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setSelectedTask(null);
      setState({ ...state, top: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTasksSet = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleTasksSet();
  }, [user, state]);

  return (
    <section>
     {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Create task</Button>
          <Drawer
            PaperProps={{ sx: { height: 350 }, elevation: 20 }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          > 
            {selectedTask ? (
              // render EditEvent component if there is a selectedEvent
              <EditTask
                selectedTask={selectedTask}
                onTaskEdited={(event) => onTaskEdited(event)}
                onTaskDeleted={(event) => onTaskDeleted(event)}
                onClose={() => {
                  setSelectedTask(null);
                  setState({ ...state, top: false });
                }}
              />
            ) : (
              // render CreateMessage component if there isn't a selectedEvent
              <AddTask
                onClose={() => setState({ ...state, [anchor]: false })}
                onTaskAdded={(event) => onTaskAdded(event)}
              />
            )}
          </Drawer>
        </React.Fragment>
      ))}

      {user && (
        <>
          <FullCalendar
            ref={calendarRef}
            events={tasks}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            timeGridPlugin={true}
            select={handleEventAdd}
            headerToolbar={{
              left: "today prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            eventClick={function (arg) {
              handleEditDrawer(arg);
            }}
            datesSet={handleTasksSet}
          />
        </>
      )}
    </section>
  );
}

export default ReactCalendar;
