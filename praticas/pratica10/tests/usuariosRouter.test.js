const request = require('supertest');
const app = require('../app');

describe('/usuarios', () => {
  let userId;
  let token;

  test('POST /usuarios - deve criar usuário', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' })
      .expect(201)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('usuario@email.com');
    userId = response.body._id;
  });

  test('POST /usuarios - deve retornar erro sem JSON', async () => {
    const response = await request(app)
      .post('/usuarios')
      .expect(422)
      .expect('Content-Type', /json/);
    
    expect(response.body.msg).toBe('Email e Senha são obrigatórios');
  });

  test('POST /usuarios/login - deve fazer login', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' })
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('POST /usuarios/login - credenciais inválidas', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .expect(401)
      .expect('Content-Type', /json/);
    
    expect(response.body.msg).toBe('Credenciais inválidas');
  });

  test('POST /usuarios/renovar - deve renovar token', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(response.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar - token inválido', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('Authorization', 'Bearer 123456789')
      .expect(401)
      .expect('Content-Type', /json/);
    
    expect(response.body.msg).toBe('Token inválido');
  });

  test('DELETE /usuarios/:id - deve remover usuário', async () => {
    await request(app)
      .delete(`/usuarios/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});