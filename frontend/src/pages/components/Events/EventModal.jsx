import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment";
import 'moment/locale/en-gb';
import React, { useState } from "react";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import EventService from "../../../Services/EventService";

import './EventModal.css';

const eventService = new EventService()

const EventModal = ({event, onClose, setLoading, isCreatingEvent }) => {
  const [newEvent, setNewEvent] = useState(event)
  const [expanded, setExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [locale, setLocale] = useState('en-gb')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value })
  }

  const handleStartChange = (date) => {
    setNewEvent({ ...newEvent, 'start': date })
  }

  const handleEndChange = (date) => {
    setNewEvent({ ...newEvent, 'end': date })
  }

  const handleToggleExpanded = (e) => {
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.start && newEvent.end && newEvent.description) {
      const startDate = new Date(newEvent.start)
      const endDate = new Date(newEvent.end)
      setLoading(true)
      if (startDate >= endDate) {
        alert('A data de início deve ser anterior ao término!');
        return;
      }
      try {
        let response;
        if(isEditing) {
          response = await eventService.update(newEvent)
        } else {
          response = await eventService.create(newEvent)
        }
        onClose()
      } catch (error) {
        console.log("Erro na requisição:", error)
        const errorMessage = error.response.data.message
        if (errorMessage === "Já existe um evento criado nesta mesma data e hora") {
          alert(errorMessage)
        }
      }
      setLoading(false)
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setLoading(true)
    eventService.delete(event)
      .then((response) => {
        setLoading(false)
        onClose()
      }).catch((err) => {
        console.log("Error", err)
        setLoading(false)
      })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="d-flex bd-highlight" >
        <div className="d-flex justify-content-start p-2 flex-grow-1 bd-highlight">
          {!isCreatingEvent
            ? <>
              <button className='btn p-2 bd-highlight' style={{ color: 'rgb(143 47 47)', border: 'none' }} onClick={() => setIsEditing(true)} ><i class="bi bi-pencil"></i></button>
              <button className='btn p-2 bd-highlight' style={{ color: 'rgb(143 47 47)', border: 'none' }} onClick={handleDelete}><i class="bi bi-trash"></i></button>
            </>
            : <></>}
        </div>
        <div className="d-flex bd-highlight">
          <button className="btn p-2 bd-highlight" style={{ color: 'rgb(143 47 47)', border: 'none' }} onClick={onClose}><i class="bi bi-x-circle"></i></button>
        </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicTitle'>
            <Form.Label>Título do Evento</Form.Label>
            <Form.Control type="text" placeholder="Digite o Título" name="title" value={newEvent.title} onChange={handleChange} disabled={!isEditing && !isCreatingEvent} />
          </Form.Group>
          <Form.Group controlId="formBasicStart">
            <Form.Label>Início</Form.Label>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
              <DateTimePicker
                value={moment(newEvent.start)}
                onChange={handleStartChange}
                disabled={!isEditing && !isCreatingEvent}
              /></LocalizationProvider>
          </Form.Group>
          <Form.Group controlId="formBasicEnd">
            <Form.Label>Término</Form.Label>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
              <DateTimePicker
                value={moment(newEvent.end)}
                onChange={handleEndChange}
                disabled={!isEditing && !isCreatingEvent}
              /></LocalizationProvider>
          </Form.Group>
          <Collapse in={expanded}>
            <div>
              <div>
                <Form.Group controlId="formBasicDesc">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control type='text' placeholder='Digite a descrição' name='description' value={newEvent.description} onChange={handleChange} disabled={!isEditing && !isCreatingEvent} />
                </Form.Group>
              </div>
              <Row>
                <Col xs={3}>
                  <Form.Group controlId='formBasicColor'>
                    <Form.Label>Cor</Form.Label>
                    <Form.Control type='color' name='color' value={newEvent.color} onChange={handleChange} disabled={!isEditing && !isCreatingEvent} />
                  </Form.Group>
                </Col>
                <Col xs={9}>
                  <Form.Group controlId='formBasicType'>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type='text' placeholder='Digite o tipo' name='type' value={newEvent.type} onChange={handleChange} disabled={!isEditing && !isCreatingEvent} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Collapse>
          <Button
            variant='primary'
            type='button'
            onClick={handleToggleExpanded}
            style={{ marginTop: '10px', float: 'right' }}>
            {expanded ? <i className="bi bi-chevron-double-up"></i> : <i className="bi bi-chevron-double-down"></i>}
          </Button>
          <Button
            variant='success'
            type='submit'
            style={{ marginTop: '10px', marginRight: '10px' }}
            disabled={(!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.description) || (!isEditing && !isCreatingEvent)}
          >
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EventModal