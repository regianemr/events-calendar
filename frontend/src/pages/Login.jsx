import React, { useState } from 'react';
import { Button, Form, NavLink } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService.js';
import { validateEmail, validatePassword } from '../Utils/validations.js';
import './Login.css';

const userService = new UserService()

const Login = () => {
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const navigate = useNavigate()
  

  const handleEmailChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handlePasswordChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const success = await userService.login(form)
      if (success) {
        navigate('/calendar')
      }
    } catch (error) {
      alert('Algo deu errado com o login: ' + error.response?.data?.msg)
      console.log(error)
    }
    setLoading(false)
  }

  const validateInput = () => {
    return validateEmail(form.email) && validatePassword(form.password)
  }

  return (
    <div className='container-auth'>
      <div className="container-login" >
      <h3>Faça seu login</h3>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formEmail'>
          <Form.Control className='input' type="email" placeholder="Digite o seu e-mail" name="email" value={form.email} onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control className='input' type="password" placeholder="Digite sua senha" name="password" value={form.password} onChange={handlePasswordChange} />
        </Form.Group>
        <Button
        onClick={handleSubmit}
          className='btn-login'
          variant='success'
          type='submit'
          disabled={ loading || !validateInput()}
        >
          Entrar
        </Button>
        <div className='register'>
          <p>Não possui conta?</p>
          <NavLink onClick={() => navigate("/register")}>Cadastrar</NavLink>
        </div>
      </Form>
    </div>
    </div>
  )
}

export default Login