const readline = require("readline-sync");
const conectar = require("./database");

let db;
let collection;

async function inserir(nomeTarefa) {
    const resultado = await collection.insertOne({ 
        nome: nomeTarefa, 
        concluida: false
    });
    console.log("Tarefa criada com sucesso!", resultado);
}

async function buscar(nomeTarefa) {
    const resultado = await collection.find({ nome: nomeTarefa });
    console.log("Tarefas encontradas:", resultado);
}

async function alterar(nomeTarefa, nomeAtual, concluidaAtual) {
    const resultado = await collection.updateOne(
        { nome: nomeTarefa },
        { $set: { nome: nomeAtual, concluida: concluidaAtual } }
    );
    console.log("Tarefa alterada com sucesso!", resultado);
}

async function remover(nomeTarefa) {
    const resultado = await collection.deleteOne({ nome: nomeTarefa });
    console.log("Tarefa removida com sucesso!", resultado);
}

async function main() {
    db = await conectar();
    collection = db.collection("tarefas");

    while (true) {
        console.log("MENU PRINCIPAL");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");

        const opcao = readline.question("Escolha uma opção: ");

        switch (opcao) {
            case "1": {
                const nome = readline.question("Nome da tarefa: ");
                await inserir(nome);
                break;
            }
            case "2": {
                const nome = readline.question("Informe o nome da tarefa: ");
                await buscar(nome);
                break;
            }
            case "3": {
                const nome = readline.question("Informe o nome da tarefa a ser alterada: ");
                const nomeAtual = readline.question("Informe o novo nome da tarefa: ");
                const concluidaAtual = readline.question("Informe a situação da tarefa: ");
                await alterar(nome, nomeAtual, concluidaAtual);
                break;
            }
            case "4": {
                const nome = readline.question("Informe o nome da tarefa a ser removida: ");
                await remover(nome);
                break;
            }
            case "5":
                process.exit(0);
            default:
                console.log("Opção inválida!");
        }
    }
}

main();