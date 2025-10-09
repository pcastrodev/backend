// importar o cliente do mongodb
const { MongoClient } = require('mongodb');

// string de conexão
const url = "mongodb+srv://pcastro:@cluster0.udzcqn7.mongodb.net/"

const client = new MongoClient(url);

async function conectar() {
    try {
        await client.connect();
        console.log("Conectou ao MongoDB com sucesso!");
        return client.db("agenda");
    } catch (e) {
        console.log("Erro ao conectar ao MongoDB:", e.message);
    }
}

module.exports = conectar;
