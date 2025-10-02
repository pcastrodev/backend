const tarefas = []; 

function gerarId() {
  return Math.random().toString(36).substr(2, 4);
}

function listar() {
  return tarefas;
}

function buscarPeloId(tarefaId) {
  return tarefas.find(t => t.id === tarefaId) || null;
}

function criar(tarefa) {
  const nova = { id: gerarId(), nome: tarefa.nome ?? '', concluida: !!tarefa.concluida };
  tarefas.push(nova);
  return nova;
}

function atualizar(tarefa) {
  const idx = tarefas.findIndex(t => t.id === tarefa.id);
  if (idx === -1) return null;
  tarefas[idx] = {
    ...tarefas[idx],
    ...(tarefa.nome !== undefined ? { nome: tarefa.nome } : {}),
    ...(tarefa.concluida !== undefined ? { concluida: !!tarefa.concluida } : {}),
  };
  return tarefas[idx];
}

function remover(tarefaId) {
  const idx = tarefas.findIndex(t => t.id === tarefaId);
  if (idx === -1) return null;
  const [removida] = tarefas.splice(idx, 1);
  return removida;
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
