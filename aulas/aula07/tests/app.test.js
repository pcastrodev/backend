const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("Testes da API Tarefas", () => {
  let id;

  test("GET /tarefas deve retornar 200", async () => {
    const response = await request.get("/tarefas");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true); // toBe(true) == toBeTruthy()
  });

  test("POST /tarefas deve retornar 201", async () => {
    const dados = { nome: "Estudar para P1" };
    const response = await request.post("/tarefas").send(dados);
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeDefined();
    id = parseInt(response.body.id);
    expect(response.body.nome).toBe(dados.nome);
    expect(response.body.concluida).toBe(false);
  });

  test("GET /tarefas/id deve retornar 200", async () => {
    const response = await request.get(`/tarefas/${id}`);
    expect(response.status).toBe(200);
  });
});