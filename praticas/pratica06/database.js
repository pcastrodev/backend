const { MongoClient } = require('mongodb')
const url = process.env.MONGODB_URI || 'mongodb+srv://pedro_poderoso:admin123@cluster0.udzcqn7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(url)
async function conectarDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect()
  }
  return client.db('agenda')
}
module.exports = { conectarDb }
