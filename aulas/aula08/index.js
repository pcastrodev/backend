const readline = require("readline-sync");
const conectar = require("./database");

function main() {
    while (true) {
        console.log("MENU PRINCIPAL");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");

        const opcao = readline.question("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                criarTarefa();
                break;
            case "2":
                buscarTarefa();
                break;
            case "3":
                alterarTarefa();
                break;
            case "4":
                removerTarefa();
                break;
            case "5":
                console.log("Saindo...");
                process.exit(0);
            default:
                console.log("Opção inválida!");
                main();
        }
    }
}