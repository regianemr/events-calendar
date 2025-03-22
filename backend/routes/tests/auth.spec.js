import dotenv from 'dotenv';
import mongoose from 'mongoose';
import request from "supertest";

import app from "../../app";
import User from '../../models/User';

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST);
});

afterEach(async () => {
  await User.deleteMany({});
});

// afterAll(async () => {
//   // Desconecta do banco de dados após todos os testes
//   await mongoose.connection.close();
// });


describe("Verificar registro e login de usuário", () => {
  it("Verificar se api está rodando", async () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(response => {
        expect(response.body.message).toEqual("Seja bem-vindo!")
      })
    })
    
  it("Verificar se o usuário foi cadastrado", async () => {
    return request(app)
    .post('/auth/register')
    .send({
      name: 'Teste',
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678'
    })
    .expect(201)
    .then(response => {
      expect(response.body.message).toEqual("Usuário criado com sucesso!")
    })
    })

  it("Verificar se todos os campos foram preenchidos", async () => {
    return request(app)
    .post('/auth/register')
    .send({
      name: '',
      email: '',
      password: '',
    })
    .expect(422)
    .then(response => {
      expect(response.body.message).toEqual("Por favor, preencha todos os campos!")
    })
    })

    it("Retornar erro se as senhas não conferirem", async () => {
      return request(app)
      .post('/auth/register')
      .send({
        name: 'Teste',
        email: 'test@test.com',
        password: '12345678',
        confirmPassword: '123456789'
      })
      .expect(422)
      .then(response => {
        expect(response.body.message).toEqual("As senhas não conferem, por favor, digite novamente!")
      })
      })
      
    it("Verificar se o usuário já existe", async () => {
      await request(app)
      .post('/auth/register')
      .send({
        name: 'Teste',
        email: 'test@test.com',
        password: '12345678',
        confirmPassword: '12345678'
      })

      return request(app)
      .post('/auth/register')
      .send({
        name: 'Teste',
        email: 'test@test.com',
        password: '12345678',
        confirmPassword: '12345678'
      })
      .expect(422)
      .then(response => {
        expect(response.body.message).toEqual("Usuário já existe. Por favor, tente outro e-mail!")
      })
      })

  })

describe('Login de Usuário', () => {
  it("Realiza login do usuário já cadastrado", async () => {
   
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Teste',
        email: 'test@test.com',
        password: '12345678',
        confirmPassword: '12345678'
      })

    return request(app)
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: '12345678'
    })
    .expect(200)
    .then(response => {
      expect(response.body).toHaveProperty('token')
      expect(response.body.message).toEqual("Autenticação realizada com sucesso!")
    })
    })
  })
