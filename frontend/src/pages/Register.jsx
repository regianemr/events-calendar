import React, { useState } from 'react';
import { Button, Form, NavLink } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService.js';
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '../Utils/validations.js';
import './Login.css';

const userService = new UserService()

const Register = () => {
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const [isPasswordDifferent, setIsPasswordDifferent] = useState(false)
  const [isPasswordShort, setIsPasswordShort] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setIsPasswordDifferent(e.target.value !== form["confirmPassword"])
    setIsPasswordShort(e.target.value.length < 8 && e.target.value !== "")

    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleConfirmPasswordChange = (e) => {
    setIsPasswordDifferent(form["password"] !== e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await userService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })
      if (data) {
        const responseLogin = await userService.login({
          email: form.email,
          password: form.password,
        })
        if (responseLogin) {
          navigate('/calendar')
        }
      }
    } catch (error) {
      alert('Algo deu errado com o cadastro.' + error)
    }
    setLoading(false)
  }

  const validateInput = () => {
    return validateEmail(form.email)
      && validatePassword(form.password)
      && validateName(form.name)
      && validateConfirmPassword(form.password, form.confirmPassword)
  }

  return (
    <div className='container-auth'>
      <div className="container-login" >
        <h3>Faça seu Cadastro</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formName'>
            <Form.Control className='input' type="text" placeholder="Digite o seu nome" name="name" value={form.name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Control className='input' type="text" placeholder="Digite o seu e-mail" name="email" value={form.email} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Control className='input' type="password" placeholder="Digite a sua senha" name="password" value={form.password} onChange={handlePasswordChange} />
          </Form.Group>
          <Form.Group controlId='formCofirmPassword'>
            <Form.Control className='input' type="password" placeholder="Confirme a sua senha" name="confirmPassword" value={form.confirmPassword} onChange={handleConfirmPasswordChange} />
          </Form.Group>
          {isPasswordShort ? <p style={{ color: "rgb(250, 69, 69)" }}>Senha muita curta</p> : <></>}
          {isPasswordDifferent ? <p style={{ color: "rgb(250, 69, 69)" }}>Senhas não coincidem</p> : <></>}
          <Button
            onClick={handleSubmit}
            className='btn-login'
            variant='success'
            type='submit'
            disabled={loading || !validateInput()}
          >
            Efetuar Cadastro
          </Button>
          <div className='register'>
            <p>Já possui conta?</p>
            <NavLink onClick={() => navigate("/")}>Login</NavLink>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register