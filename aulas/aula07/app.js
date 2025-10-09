const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

const tarefas = [];

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.get("/tarefas/:id", (req, res) => {
  res.json({});
});

module.exports = app;