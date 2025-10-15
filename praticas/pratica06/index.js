const readline = require('readline-sync')
const controlador = require('./controlador')
function menu() {
  console.log('\n=== MENU PRINCIPAL ===')
  console.log('1 - Adicionar contato')
  console.log('2 - Buscar contato')
  console.log('3 - Atualizar contato')
  console.log('4 - Remover contato')
  console.log('5 - Sair')
}
async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1': {
      const nome = readline.question('Nome da tarefa: ')
      await controlador.adicionarTarefa(nome)
      console.log('Tarefa adicionada.')
      break
    }
    case '2': {
      const nome = readline.question('Nome da tarefa: ')
      const tarefa = await controlador.buscarTarefa(nome)
      if (tarefa && tarefa.id) {
        console.log('\n-- Resultado --')
        console.log('id:        ', String(tarefa.id))
        console.log('nome:      ', tarefa.nome)
        console.log('concluida: ', tarefa.concluida)
      } else {
        console.log('Tarefa não encontrada.')
      }
      break
    }
    case '3': {
      const nome = readline.question('Nome da tarefa: ')
      const concluida = readline.question('Concluída? (true/false | sim/nao): ')
      await controlador.atualizarTarefa(nome, concluida)
      console.log('Atualização concluída (se a tarefa existia).')
      break
    }
    case '4': {
      const nome = readline.question('Nome da tarefa: ')
      await controlador.removerTarefa(nome)
      console.log('Remoção concluída (se a tarefa existia).')
      break
    }
    case '5':
      process.exit(0)
    default:
      console.log('Opção inválida.')
  }
}
async function main() {
  while (true) {
    menu()
    const opcao = readline.question('Escolha uma opção: ')
    await escolherOpcao(opcao)
  }
}
main().catch(err => {
  console.error('Erro na aplicação:', err)
  process.exit(1)
})
