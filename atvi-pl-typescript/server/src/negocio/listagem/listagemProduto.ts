import Produto from "../../modelo/produto";
import ListagemProdutos from "./listagemProdutos";

export default class ListagemProduto extends ListagemProdutos {
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
    }
    public listarProdutos(): void {
        if (this.produtos.length === 0 || this.produtos.every(produto => produto.nomeProduto.trim() === '')) {
            console.log(`Não há produtos para listar.\n`);
            return;
        }
        console.log(`\nLista de todos os produtos:`);
        const produtosFormatados = this.produtos.map((produto) => {
            const nomeDoProduto = produto.nomeProduto
            const precoDoProduto = produto.precoProduto
            return `${nomeDoProduto}: R$ ${precoDoProduto}`
        })
        console.log(produtosFormatados.join("\n"));
        console.log(`\n`);
    }
}