import cors from 'cors'
import 'dotenv/config'
import express, { json } from 'express'

import authRouter from './routes/auth.js'
import eventRouter from './routes/events.js'


const app = express()
app.use(cors({credentials: true, origin: true}))
app.use(json())
app.use('/auth', authRouter)
app.use('/events', eventRouter)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Seja bem-vindo!'})
})

export default app

  




