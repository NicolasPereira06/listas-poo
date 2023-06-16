import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import ListagemProdutosServicos from "./listagemProdutosServicos";

export default class ListagemProdutoServico extends ListagemProdutosServicos {
    private clientes !: Array<Cliente>
    private produtos !: Array<Produto>
    private servicos !: Array<Servico>

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
    }

    public listarProdutosServicos(): void {
        this.clientes.forEach(cliente => {
            console.log(`\nNome do cliente: ` + cliente.nome)
    
            const produtosConsumidos = new Set(cliente.getProdutosConsumidos.map(produtoConsumido => produtoConsumido.nomeProduto));
            const servicosConsumidos = new Set(cliente.getServicosConsumidos.map(servicoConsumido => servicoConsumido.nomeServico));
    
            if (produtosConsumidos.size === 0 && servicosConsumidos.size === 0) {
                console.log(`Nenhum produto ou serviço foi consumido ainda.`);
            } else {
                console.log(`\nLista de todos os produtos e serviços consumidos pelos clientes:`);
                if (produtosConsumidos.size > 0) {
                    console.log(`Produtos Consumidos: ` + [...produtosConsumidos].join(", ") + ".");
                }
                if (servicosConsumidos.size > 0) {
                    console.log(`Serviços Adquiridos: ` + [...servicosConsumidos].join(", ") + ".");
                }
            }
    
            console.log(`--------------------------------------`);
        });
    
        // Verificação para nenhum produto ou serviço consumido por nenhum cliente
        const todosProdutosConsumidos = new Set(
            this.clientes.flatMap(cliente => cliente.getProdutosConsumidos.map(produtoConsumido => produtoConsumido.nomeProduto))
        );
        const todosServicosConsumidos = new Set(
            this.clientes.flatMap(cliente => cliente.getServicosConsumidos.map(servicoConsumido => servicoConsumido.nomeServico))
        );
    
        if (todosProdutosConsumidos.size === 0 && todosServicosConsumidos.size === 0) {
            console.log(`Nenhum produto ou serviço foi consumido ainda.`);
        }
    
        console.log(`\n`);
    }    
}    