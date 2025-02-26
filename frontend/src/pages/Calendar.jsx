import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import EventService from '../Services/EventService';
import CustomToolbar from './components/CustomToolbar/CustomToolbar';
import EventModal from "./components/Events/EventModal";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

const eventService = new EventService()

function MyCalendar() {
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const eventSyle = (event) => ({
    style: {
      backgroundColor: event.color,
    }
  })

  const moveEvents = async(data) => {
    setLoading(true)
    const { start, end } = data
    await Promise.all(events.map(async(event) => {
      if (event.id === data.event.id) {
        event.start = moment(start)
        event.end = moment(end)
        await eventService.update(event)
      }
    }));
    setLoading(false)
  }
  
  const handleSelectSlot = ({ start, end }) => {
      setSelectedSlot({
        title: '',
        start: moment(start),
        end: moment(end),
        description: '',
        color: '',
        type: '',
      })
    }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading)
  }

  const handleEventClose = () => {
    setSelectedEvent(null)
    setSelectedSlot(null)
  }

  useEffect(() => {
    eventService.list()
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.log("Erro na requisição:", error)
      })
  }, [loading])

  return (
    <div className="screen">
      <div className="calendar">
        <DragAndDropCalendar
          defaultDate={moment().toDate()}
          defaultView='month'
          events={events}
          localizer={localizer}
          resizable
          selectable
          onEventDrop={moveEvents}
          onEventResize={moveEvents}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventSyle}
          onSelectSlot={handleSelectSlot}
          components={{
            toolbar: CustomToolbar,
          }}
          className='calendar'
        />
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleEventClose}
            setLoading={handleLoadingChange}
          />
        )}
        {selectedSlot && (
          <EventModal
            isCreatingEvent= {true}
            event={selectedSlot}
            onClose={handleEventClose}
            setLoading={handleLoadingChange}
          />
        )}
      </div>
    </div>

  )
}

export default MyCalendar