import Cliente from "../../modelo/cliente";
import ListagemProdutoServicoMaisConsumido from "./listagemProdutoServicoMaisConsumido";

export default class ListagemProdutosServicosMaisConsumidos extends ListagemProdutoServicoMaisConsumido {
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listarProdutosServicosMaisConsumidos(): void {
        const listaProdutos: {[key: string]: number} = {};
        const listaServicos: {[key: string]: number} = {};
    
        this.clientes.forEach(cliente => {
            const produtosConsumidos = cliente.getProdutosConsumidos;
            const servicosConsumidos = cliente.getServicosConsumidos;
    
            produtosConsumidos.forEach(produto => {
                if (produto.nomeProduto in listaProdutos) {
                    listaProdutos[produto.nomeProduto] += 1;
                } else {
                    listaProdutos[produto.nomeProduto] = 1;
                }
            });
    
            servicosConsumidos.forEach(servico => {
                if (servico.nomeServico in listaServicos) {
                    listaServicos[servico.nomeServico] += 1;
                } else {
                    listaServicos[servico.nomeServico] = 1;
                }
            });
        });
    
        const listaOrdenadaProdutos = Object.entries(listaProdutos)
            .sort((a, b) => b[1] - a[1]);
    
        const listaOrdenadaServicos = Object.entries(listaServicos)
            .sort((a, b) => b[1] - a[1]);
    
        if (listaOrdenadaProdutos.length === 0) {
            console.log(`Nenhum produto foi consumido ainda.`);
        } else {
            console.log(`\nLista dos produtos mais consumidos:`);
            listaOrdenadaProdutos.forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. ${nome}: ${quantidade} vezes consumido.`);
            });
            console.log(`--------------------------------------`);
            console.log(`\n`);
        }
    
        if (listaOrdenadaServicos.length === 0) {
            console.log(`Nenhum serviço foi adquirido ainda.`);
        } else {
            console.log(`\nLista dos serviços mais adquiridos:`);
            listaOrdenadaServicos.forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. ${nome}: ${quantidade} vezes adquirido.`);
            });
            console.log(`--------------------------------------`);
            console.log(`\n`);
        }
    }
    
}

