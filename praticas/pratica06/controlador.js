const { Tarefa } = require('./modelo')
async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false)
  await tarefa.init()
  await tarefa.inserir()
}
async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome)
  await tarefa.init()
  await tarefa.buscar()
  return tarefa
}
function toBool(input) {
  const s = String(input).trim().toLowerCase()
  return ['true', '1', 'sim', 's', 'y', 'yes'].includes(s)
}
async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome)
  await tarefa.init()
  const encontrada = await tarefa.buscar()
  if (encontrada) {
    tarefa.nome = nome
    tarefa.concluida = toBool(concluida)
    await tarefa.alterar()
  }
}
async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome)
  await tarefa.init()
  const encontrada = await tarefa.buscar()
  if (encontrada) {
    await tarefa.deletar()
  }
}
module.exports = { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa }
