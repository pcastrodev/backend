const { conectarDb } = require('./database')
class Tarefa {
  constructor(nome, concluida = false) {
    this.id = null
    this.nome = nome
    this.concluida = concluida
    this.db = null
    this.collection = null
  }
  async init() {
    this.db = await conectarDb()
    this.collection = this.db.collection('tarefas')
  }
  async inserir() {
    const resultado = await this.collection.insertOne({ nome: this.nome, concluida: this.concluida })
    this.id = resultado.insertedId
  }
  async alterar() {
    if (!this.id) throw new Error('Tarefa sem id. Use buscar() antes de alterar.')
    await this.collection.updateOne({ _id: this.id }, { $set: { nome: this.nome, concluida: this.concluida } })
  }
  async deletar() {
    await this.collection.deleteOne({ nome: this.nome })
  }
  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome })
    if (resultado) {
      this.id = resultado._id
      this.nome = resultado.nome
      this.concluida = resultado.concluida
    }
    return resultado
  }
}
module.exports = { Tarefa }
