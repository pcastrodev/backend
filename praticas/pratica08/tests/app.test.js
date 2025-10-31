// tests/app.test.js
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('API REST - Autenticação e proteção de rotas', () => {
  let tokenSalvo = null;
  let tokenRenovado = null;

  test('GET /produtos sem token => 401 + { msg: "Não autorizado" }', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido simples => 401 + { msg: "Token inválido" }', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789'); // sem Bearer
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  test('POST /usuarios/login com JSON válido => 200 + { token }', async () => {
    const payload = { usuario: 'email@exemplo.com', senha: 'abcd1234' };
    const res = await request.post('/usuarios/login').send(payload);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');

    tokenSalvo = res.body.token;
  });

  test('GET /produtos com token válido => 200 + JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', `Bearer ${tokenSalvo}`);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar com token válido => 200 + { token }', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${tokenSalvo}`);

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');

    tokenRenovado = res.body.token;
  });

  test('GET /produtos com token renovado => 200 + JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', tokenRenovado); // aqui testando sem "Bearer "
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
