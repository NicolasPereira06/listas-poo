import Cliente from "../../modelo/cliente";
import ListagemProdutoServicoValor from "./listagemProdutoServicoValor";

export default class ListagemProdutosServicosValores extends ListagemProdutoServicoValor {
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listarProdutosServicosValor(): void {
        const listaConsumidores: Array<{ nome: string; totalConsumido: number }> = [];
    
        this.clientes.forEach((cliente) => {
            const produtosConsumidos = cliente.getProdutosConsumidos;
            const servicosConsumidos = cliente.getServicosConsumidos;
            const totalConsumido =
                produtosConsumidos.reduce((total, produto) => total + (+produto.precoProduto), 0) +
                servicosConsumidos.reduce((total, servico) => total + (+servico.precoServico), 0);
    
            if (totalConsumido > 0) {
                listaConsumidores.push({
                    nome: cliente.nome,
                    totalConsumido: totalConsumido,
                });
            }
        });
    
        listaConsumidores.sort((a, b) => b.totalConsumido - a.totalConsumido);
    
        if (listaConsumidores.length === 0) {
            console.log(`Nenhum produto ou serviço foi consumido ainda.`);
        } else {
            console.log(`\nLista dos 5 clientes que mais consumiram produtos ou serviços em valor:`);
            for (let i = 0; i < 5 && i < listaConsumidores.length; i++) {
                console.log(`${i + 1}. ${listaConsumidores[i].nome}: R$ ${listaConsumidores[i].totalConsumido.toFixed(2)}`);
            }
        }
    }
    
    
}