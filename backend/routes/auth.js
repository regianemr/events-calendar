import bcrypt from 'bcrypt'
import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const router = express.Router()

// Register User
router.post('/register', async(req, res) => {
  const {name, email, password, confirmPassword} = req.body

  // validations
  if(!name || !email || !password) {
    return res.status(422).json({ msg: "Por favor, preencha todos os campos!"})
  }

  if(password !== confirmPassword) {
    return res.status(422).json({msg: "As senhas não conferem, por favor, digite novamente!"})
  }

  // check if user exists
  const userExists = await User.findOne({ email })

  if(userExists) {
    return res.status(422).json({ msg: "Usuário já existe.Por favor, tente outro e-mail!"})
  }

  // Create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // Create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  try {
    await user.save()
    res.status(201).json({msg: "Usuário criado com sucesso!"})

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
  }
})

// Login User
router.post("/login", async (req, res) => {
  const {email, password} = req.body

  // validations
  if(!email || !password) {
    return res.status(422).json({ msg: "Por favor, preencha todos os campos!"})
  }

  // check if user exist
  const user = await User.findOne({ email})

  if(!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!"})
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
  if(!checkPassword) {
    return res.status(400).json({ msg: "Usuário ou senha inválida!"})
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign( { id: user._id }, secret, { expiresIn: "7d" })
    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token })
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Aconteceu um erro no servidor.'})
  }
})

export default router