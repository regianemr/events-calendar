import cors from 'cors'
import 'dotenv/config'
import express, { json } from 'express'

import { connectToDB } from './config/db.js'
import authRouter from './routes/auth.js'
import eventRouter from './routes/events.js'


const app = express()
app.use(cors({credentials: true, origin: true}))
app.use(json())
app.use('/auth', authRouter)
app.use('/events', eventRouter)

// Open Route - Public
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Seja bem-vindo!'})
})

const PORT = process.env.PORT || "5000"
app.listen(PORT, () => {
  connectToDB()
  console.log("Server running on port", PORT)
})

  




