import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import Selecionador from "../negocio/buscas/selecionador";
import SelecionadorProduto from "../negocio/buscas/selecionadorProduto";
import CadastroServico from "../negocio/cadastros/cadastroServico";
import CadastroCliente from "../negocio/cadastros/cadastroCliente";
import CadastroProduto from "../negocio/cadastros/cadastroProdutos";
import EditorCliente from "../negocio/editores/editarCliente";
import EditorProduto from "../negocio/editores/editorProduto";
import ListagemClientes from "../negocio/listagem/listagemClientes";
import ListagemProduto from "../negocio/listagem/listagemProduto";
import ListagemServico from "../negocio/listagem/listagemServico";
import SelecionadorServico from "../negocio/buscas/selecionadorServico";
import EditorServico from "../negocio/editores/editorServico";
import cadastrarRG from "../negocio/cadastros/cadastroNovoRG";
import cadastrarTelefone from "../negocio/cadastros/cadastrarNovoTelefone";
import cadastrarPet from "../negocio/cadastros/cadastrarNovoPet";
import listarProdutosConsumidos from "../negocio/listagem/listagemConsumoProduto";
import listarServicosAdquiridos from "../negocio/listagem/listagemAdquirirServico";
import ListagemProdutoServico from "../negocio/listagem/listagemProdutoServico";
import listagemClientesMaisConsumidores from "../negocio/listagem/listagemClientesMaisConsumidores";
import ListagemProdutosServicosMaisConsumidos from "../negocio/listagem/listagemProdutosServicosMaisConsumidos";
import ListagemProdutoServicoPets from "../negocio/listagem/listagemProdutoServicoPets";
import ListagemProdutosServicosValores from "../negocio/listagem/listagemProdutosServicosValores";
import readlineSync from 'readline-sync';

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Editar o cliente`);
    console.log(`4 - Deletar o cliente`);
    console.log(`5 - Deletar um pet`);
    console.log(`6 - Cadastrar um produto`);
    console.log(`7 - Listar todos os produtos`);
    console.log(`8 - Editar o produto`);
    console.log(`9 - Deletar o produto`);
    console.log(`10 - Cadastrar um serviço`);
    console.log(`11 - Listar todos os serviços`);
    console.log(`12 - Editar o serviço`);
    console.log(`13 - Deletar o serviço`);
    console.log(`14 - Adicionar um novo pet`);
    console.log(`15 - Adicionar um novo RG`)
    console.log(`16 - Adicionar novo telefone`)
    console.log(`17 - Consumir um produto`)
    console.log(`18 - Adquirir um serviço`)
    
    console.log(`19 - Listar os produtos consumidos pelo cliente`)
    console.log(`20 - Listar os serviços adquiridos pelo cliente`)
    console.log(`21 - Listar todos os produtos e serviços consumidos`)
    console.log(`22 - Listagem dos 10 clientes que mais consumiram produtos ou serviços em quantidade`)
    console.log(`23 - Listagem geral dos serviços ou produtos mais consumidos`)
    console.log(`24 - Listagem dos serviços ou produtos mais consumidos por tipo e raça de pets`)
    console.log(`25 - Listagem dos 5 clientes que mais consumiram em valor`)
   

    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes,empresa.getRgs, empresa.getTelefones, empresa.getPets)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes, empresa.getRgs, empresa.getTelefones, empresa.getPets)
            listagem.listar()
            break;
        case 3:
            let cpfEditar = entrada.receberTexto('Digite um cpf para edição: ')
            let selecionadorClienteEditar = new Selecionador(empresa.getClientes)
            let clienteEditar = selecionadorClienteEditar.selecionar(cpfEditar)

            if (clienteEditar.getCpf.getValor === '') {
                console.log('CPF não encontrado. Edição cancelada.');
                break;
            }

            let editor = new EditorCliente()
            editor.editar(clienteEditar)
            break
        case 4:
            let cpf = entrada.receberTexto('Digite um CPF para exclusão: ')
            let selecionadorCliente = new Selecionador(empresa.getClientes)
            let cliente = selecionadorCliente.selecionar(cpf)

            if (cliente.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`Nome do cliente selecionado: ${cliente.nome}`);

            let indice = empresa.getClientes.indexOf(cliente)
            delete empresa.getClientes[indice]

            console.log('\nCliente exluído com sucesso. :)');

            break
        case 5:
            let cpfPet = entrada.receberTexto('Digite um CPF para excluir o pet do cliente: ')
            let selecionadorClientePet = new Selecionador(empresa.getClientes)
            let clientePet = selecionadorClientePet.selecionar(cpfPet)
            
            if (clientePet.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção de pet cancelada.');
            } else {
                console.log(`\nNome do cliente selecionado: ${clientePet.nome}`);
                let indicePet = receberIndicePet();
                let petsCliente = clientePet.getPets;
                
                if (indicePet >= 0 && indicePet < petsCliente.length) {

                    clientePet.removerPet(petsCliente[indicePet]);
                    console.log(`Pet removido com sucesso. :)`);
                } else {
                    console.log(`Índice do pet inválido. Remoção cancelada.`);
                }
            }
            break
        case 6:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrarProduto()
            break;
        case 7:
            let listarProduto = new ListagemProduto(empresa.getProdutos)
            listarProduto.listarProdutos()
            break
        case 8:
            let produtoNome = entrada.receberTexto('Digite o nome do produto que deseja editar: ');
            let produtoEncontrado2 = false;
            
            empresa.getProdutos.forEach((produto) => {
              if (produto.nomeProduto === produtoNome) {
                produtoEncontrado2 = true;
                let editorProduto = new EditorProduto();
                editorProduto.editar(produto);
              }
            });
            
            if (!produtoEncontrado2) {
              console.log(`O produto '${produtoNome}' não foi encontrado. Edição cancelada.\n`);
            }
            break
        case 9:
            let nomeProduto = entrada.receberTexto('Digite o nome do produto que deseja excluir: ');
            let produtoEncontrado3 = false;
            
            empresa.getProdutos.forEach((produto, indice) => {
              if (produto.nomeProduto === nomeProduto) {
                produtoEncontrado3 = true;
                empresa.getProdutos.splice(indice, 1);
                console.log(`Produto '${nomeProduto}' excluído com sucesso. :)`);
                return;
              }
            });
            
            if (!produtoEncontrado3) {
              console.log(`O produto '${nomeProduto}' não foi encontrado. Remoção cancelada.`);
            }
            break
        case 10:
            let cadastroServico = new CadastroServico(empresa.getServicos)
            cadastroServico.cadastrarServico()
            break;
        case 11:
            let listarServico = new ListagemServico(empresa.getServicos)
            listarServico.listarServicos()
            break
        case 12:
            let servicoNome = entrada.receberTexto('Digite o nome do serviço que deseja editar: ');
            let servicoEncontrado2 = false;
            
            empresa.getServicos.forEach((servico) => {
              if (servico.nomeServico === servicoNome) {
                servicoEncontrado2 = true;
                let editorServico = new EditorServico();
                editorServico.editar(servico);
              }
            });
            
            if (!servicoEncontrado2) {
              console.log(`O serviço '${servicoNome}' não foi encontrado. Edição cancelada.\n`);
            }
            break
        case 13:
            let nomeServico = entrada.receberTexto('Digite o nome do serviço que deseja excluir: ');
            let servicoEncontrado3 = false;
            
            empresa.getServicos.forEach((servico, indice) => {
              if (servico.nomeServico === nomeServico) {
                servicoEncontrado3 = true;
                empresa.getServicos.splice(indice, 1);
                console.log(`Serviço '${nomeServico}' excluído com sucesso. :)`);
                return;
              }
            });
            
            if (!servicoEncontrado3) {
              console.log(`O produto '${nomeServico}' não foi encontrado. Remoção cancelada.`);
            }
            break
        case 14:
            let cpfCliente = entrada.receberTexto('Digite o CPF do cliente que deseja adicionar um pet: ')
            let selecionarCliente = new Selecionador(empresa.getClientes)
            let clienteSelecionado = selecionarCliente.selecionar(cpfCliente)

            if (clienteSelecionado.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`Nome do cliente selecionado: ${clienteSelecionado.nome}`);

            cadastrarPet(clienteSelecionado)
        
            break
        case 15:

            let rgCliente = entrada.receberTexto('Digite o CPF do cliente que deseja adicionar um RG: ')
            let selecionarClienteRG = new Selecionador(empresa.getClientes)
            let clienteSelecionadoRG = selecionarClienteRG.selecionar(rgCliente)

            if (clienteSelecionadoRG.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`\nNome do cliente selecionado: ${clienteSelecionadoRG.nome}`);

            cadastrarRG(clienteSelecionadoRG)
            
            break
        case 16:
            let clienteCpf = entrada.receberTexto('Digite o CPF do cliente que deseja adicionar um telefone: ')
            let selecionarClienteTelefone = new Selecionador(empresa.getClientes)
            let clienteSelecionadoTelefone = selecionarClienteTelefone.selecionar(clienteCpf)

            if (clienteSelecionadoTelefone.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`Nome do cliente selecionado: ${clienteSelecionadoTelefone.nome}`);
            
            cadastrarTelefone(clienteSelecionadoTelefone)

            break
        case 17:
            let input = entrada.receberTexto('Digite o CPF do cliente que deseja consumir um produto: ')
            let encontraCliente = new Selecionador(empresa.getClientes)
            let clienteEncontrado = encontraCliente.selecionar(input)

            if (clienteEncontrado.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`\nNome do cliente selecionado: ${clienteEncontrado.nome}`);

            let inputProduto = entrada.receberTexto('Digite o nome do produto que deseja consumir: ')
            let produtoEncontrado4 = false;

            empresa.getProdutos.forEach((produto) => {
                if (produto.nomeProduto === inputProduto) {
                  produtoEncontrado4 = true;
                  clienteEncontrado.consumirProduto(produto)
                  console.log(`Produto consumido com sucesso! :)`)
                  return;
                }
            });

            if (!produtoEncontrado4) {
                console.log(`O produto '${inputProduto}' não foi encontrado. Transação cancelada.`);
            }

            break
        case 18:
            let inputServico = entrada.receberTexto('Digite o CPF do cliente que deseja adquirir um serviço: ')
            let encontraClienteServico = new Selecionador(empresa.getClientes)
            let clienteEncontradoServico = encontraClienteServico.selecionar(inputServico)

            if (clienteEncontradoServico.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            console.log(`\nNome do cliente selecionado: ${clienteEncontradoServico.nome}`);

            let inputServico2 = entrada.receberTexto('Digite o nome do serviço que deseja adquirir: ')
            let servicoEncontrado4 = false;

            empresa.getServicos.forEach((servico) => {
                if (servico.nomeServico === inputServico2) {
                    servicoEncontrado4 = true;
                    clienteEncontradoServico.atribuirServico(servico)
                    console.log(`Serviço adquirido com sucesso! :)`)
                    return;
                }
            });

            if (!servicoEncontrado4) {
                console.log(`O serviço '${inputServico2}' não foi encontrado. Transação cancelada.`);
            }
            break
        case 19:
            let filtraCpf = entrada.receberTexto('Digite o CPF do cliente que deseja listar os produtos: ')
            let encontraClienteFiltro = new Selecionador(empresa.getClientes)
            let clienteEncontradoFiltro = encontraClienteFiltro.selecionar(filtraCpf)

            if (clienteEncontradoFiltro.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            listarProdutosConsumidos(clienteEncontradoFiltro)
            break
        case 20:
            let filtraCpfServico = entrada.receberTexto('Digite o CPF do cliente que deseja listar os serviços: ')
            let encontraClienteFiltroServico = new Selecionador(empresa.getClientes)
            let clienteEncontradoFiltroServico = encontraClienteFiltroServico.selecionar(filtraCpfServico)

            if (clienteEncontradoFiltroServico.getCpf.getValor === '') {
                console.log('CPF não encontrado. Remoção cancelada.');
                break;
            }

            listarServicosAdquiridos(clienteEncontradoFiltroServico)
            break
        case 21:
            let listagemProdutosServicos = new ListagemProdutoServico(empresa.getClientes,empresa.getProdutos, empresa.getServicos)
            listagemProdutosServicos.listarProdutosServicos()
            break
        case 22:
            let listagemClientesConsumidos = new listagemClientesMaisConsumidores(empresa.getClientes)
            listagemClientesConsumidos.listarClientesMaisConsumidores()
            break
        case 23:
            let listagemProdutosServicosMaisConsumidos = new ListagemProdutosServicosMaisConsumidos(empresa.getClientes)
            listagemProdutosServicosMaisConsumidos.listarProdutosServicosMaisConsumidos()
            break
        case 24:
            let listagemProdutosServicosPet = new ListagemProdutoServicoPets(empresa.getClientes, empresa.getPets)
            listagemProdutosServicosPet.listarProdutosServicosPet()
            break
        case 25:
            let listagemProdutosServicosValor = new ListagemProdutosServicosValores(empresa.getClientes)
            listagemProdutosServicosValor.listarProdutosServicosValor()
            break
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
        console.log(`Operação não entendida :(`)

        function receberIndicePet(): number {
            let input: string;
            do {
              input = readlineSync.question('Por favor, informe o indice do pet que deseja excluir:');
            } while (!input || isNaN(parseInt(input)));
          
            return parseInt(input);
          }
          
    }
}