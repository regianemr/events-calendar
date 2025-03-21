import 'dotenv/config'
import express from 'express'

import checkToken from '../middlewares/middlewares.js'
import Event from '../models/Event.js'

const router = express.Router()

// Events
// Add Event
router.post('/', checkToken, async (req, res) => {
  const {title, color, start, end, description, type} = req.body
  
  // validations
const missingFields = [];
  if (!title) missingFields.push("Título");
  if (!start) missingFields.push("Data de Início");
  if (!end) missingFields.push("Data de Término");
  if (!description) missingFields.push("Descrição");

if (missingFields.length > 0) {
  return res.status(422).json({
    message: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`
  });
}
  
  // check existingEvent
  const existingEvent = await Event.findOne({ start, end });
  if (existingEvent) {
    return res.status(400).json({ message: "Já existe um evento criado nesta mesma data e hora"});
  }

  const event = new Event ({
    id: crypto.randomUUID(),
    userId: req.userId,
    title,
    description,
    start,
    end,
    color,
    type,
  })

  try {
    await event.save()
    res.status(201).json({message: "Evento criado com sucesso!", event})

  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Aconteceu um erro no servidor.'})
  }
})

router.get('/', checkToken, async (req, res) => {
  const {userId} = req
  const events = await Event.find({userId});
  res.status(200).json(events);
});

router.delete('/:id', checkToken, async(req, res) => {
  const id = req.params.id
  const userId = req.userId
  const event = await Event.findOne({id})
  if (!event) {
    return res.status(404).json({message: "Evento não encontrado!"})
  }
  if (userId !== event.userId){
    return res.status(403).send()
  }
  const response = await Event.deleteOne({id, userId})
  res.status(200).json({message: "Evento deletado!"})
})

router.put('/:id', checkToken, async(req, res) => {
  const id = req.params.id
  const userId = req.userId
  const event = await Event.findOne({id})

  if (!event) {
    return res.status(404).json({message: "Evento não encontrado!"})
  }

  if (userId !== event.userId){
    return res.status(403).send()
  }
  
  const {title, start, end, description, color, type} = req.body
  
  // check existingEvent
  if (start && end) {
    console.log(start, end)
    const existingEvent = await Event.findOne({ start, end });
    console.log(existingEvent)
    if (existingEvent) {
      return res.status(400).json({ message: "Já existe um evento criado nesta mesma data e hora"});
    }
  }

  const response = await Event.updateOne({id, userId}, {$set: {
    title: title || event.title,
    start: start || event.start,
    end: end || event.end,
    description: description || event.description,
    color: color || event.color,
    type: type || event.type,
  }})
  res.status(200).json({message: "Evento atualizado!"})
})

export default router