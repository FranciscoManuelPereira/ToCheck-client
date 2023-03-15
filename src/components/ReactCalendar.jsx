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
import taskService from "../services/task.service";

function ReactCalendar() {
  const { setAuthContex, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [state, setState] = useState({
    top: false,
  });
  const [day, setday] = useState("");

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

  const getTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      console.log(response);
      setTasks(response.data);
      setState({ ...state, ["top"]: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleDrawer = (anchor, open, task) => (event) => {
    console.log(event.start);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (!open) setSelectedTask(null);

    if (task) {
      setSelectedTask(task);
    }

    setState({ ...state, [anchor]: open });
    setday(event.start);
  };

  const toggleEditDrawer = (anchor, open, task, title) => {
    console.log("here", task);

    if (task) {
      setSelectedTask({ ...task, title });
    }

    setState({ ...state, [anchor]: open });
  };

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
    <section className="CalendarArea">
      {user && (
        <>
          {["top"].map((anchor) => (
            <>
              <React.Fragment key={anchor}>
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
                      getTasks = {getTasks}
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
                      day={day}
                      onClose={() => setState({ ...state, [anchor]: false })}
                      onTaskAdded={(event) => onTaskAdded(event)}
                    />
                  )}
                </Drawer>
              </React.Fragment>
              <div className="Calendar">
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
                select={toggleDrawer(anchor, true)}
                headerToolbar={{
                  left: "today prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                eventClick={(e) =>
                  toggleEditDrawer(
                    anchor,
                    true,
                    e.event._def.extendedProps,
                    e.event._def.title
                  )
                }
                datesSet={handleTasksSet}
              />
              </div>
            </>
          ))}
        </>
      )}
    </section>
  );
}

export default ReactCalendar;
