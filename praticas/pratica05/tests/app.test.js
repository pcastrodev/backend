const request = require('supertest');
const app = require('../app');

describe('API /tarefas', () => {
  let createdId = null;

  test('GET /tarefas -> 200 e JSON (array)', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/i);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tarefas -> 201 e JSON; salvar id', async () => {
    const payload = { nome: 'Estudar Node', concluida: false };
    const res = await request(app).post('/tarefas').send(payload);
    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/i);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
    expect(typeof createdId).toBe('string');
  });

  test('GET /tarefas/:id (existente) -> 200 e JSON (obj)', async () => {
    const res = await request(app).get(`/tarefas/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/i);
    expect(res.body).toHaveProperty('id', createdId);
  });

  test('GET /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/i);
    expect(res.body).toEqual({ msg: 'Tarefa não encontrada' });
  });

  test('PUT /tarefas/:id (existente) -> 200 e JSON', async () => {
    const payload = { nome: 'Estudar Node e Express', concluida: true };
    const res = await request(app).put(`/tarefas/${createdId}`).send(payload);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/i);
    expect(res.body).toMatchObject({ id: createdId, ...payload });
  });

  test('PUT /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).put('/tarefas/1').send({ nome: 'X', concluida: false });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: 'Tarefa não encontrada' });
  });

  test('DELETE /tarefas/:id (existente) -> 204 (sem conteúdo)', async () => {
    const res = await request(app).delete(`/tarefas/${createdId}`);
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  test('DELETE /tarefas/1 -> 404 e JSON', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: 'Tarefa não encontrada' });
  });
});