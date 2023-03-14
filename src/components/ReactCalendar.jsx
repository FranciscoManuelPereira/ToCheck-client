import React from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function ReactCalendar() {

    const myEventsList = [
        {
          start: new Date('2023-03-15T10:00:00'),
          end: new Date('2023-03-15T11:00:00'),
          title: 'Meeting'
        },
        {
          start: new Date('2023-03-17T14:00:00'),
          end: new Date('2023-03-17T15:30:00'),
          title: 'Presentation'
        }
      ];

  return (

    <div>
      <Calendar
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default ReactCalendar

