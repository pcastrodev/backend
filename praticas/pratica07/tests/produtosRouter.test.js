const request = require('supertest');
const app = require('../app');
const requestApp = request(app);


describe('/produtos', () => {
  let id;

  test('POST /produtos deve retornar status 201 e o produto criado', async () => {
    const response = await requestApp
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 });

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);

    id = response.body._id;
  });

  test('POST /produtos sem JSON deve retornar 422 e a mensagem correta', async () => {
    const response = await requestApp.post('/produtos');
    expect(response.statusCode).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty(
      'msg',
      'Nome e preço do produto são obrigatórios'
    );
  });

  test('GET /produtos deve retornar status 200 e um array de produtos', async () => {
    const response = await requestApp.get('/produtos');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /produtos/:id deve retornar o produto correto', async () => {
    const response = await requestApp.get(`/produtos/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', id);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  test('GET /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await requestApp.get('/produtos/0');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await requestApp.get('/produtos/000000000000000000000000');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('PUT /produtos/:id deve atualizar e retornar 200 com os novos valores', async () => {
    const response = await requestApp
      .put(`/produtos/${id}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('_id', id);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.0);
  });

  test('PUT /produtos/:id sem JSON deve retornar 422 e a mensagem correta', async () => {
    const response = await requestApp.put(`/produtos/${id}`);
    expect(response.statusCode).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty(
      'msg',
      'Nome e preço do produto são obrigatórios'
    );
  });

  test('PUT /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await requestApp
      .put('/produtos/0')
      .send({ nome: 'Teste', preco: 1.0 });
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await requestApp
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Produto inexistente', preco: 25.0 });
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/:id deve retornar 204 e sem conteúdo', async () => {
    const response = await requestApp.delete(`/produtos/${id}`);
    expect(response.statusCode).toBe(204);
    expect(response.text === '' || Object.keys(response.body || {}).length === 0).toBe(true);
  });

  test('DELETE /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await requestApp.delete('/produtos/0');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/:id novamente deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await requestApp.delete(`/produtos/${id}`);
    expect(response.statusCode).toBe(404); // produto já removido
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});
