import dotenv from 'dotenv';
import mongoose from 'mongoose';
import request from "supertest";

import app from "../../app";
import User from '../../models/User';

dotenv.config()

beforeAll(async () => {
  console.log(process.env.MONGO_TEST)
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
    // olhar no db se usuário foi criado
  })