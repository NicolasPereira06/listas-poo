import Produto from "../../modelo/produto"

export default class SelecionadorProduto {
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>){
        this.produtos = produtos
    }

    public selecionar(nome: string, preco: string) {
        let produtoAlvo = new Produto(nome, preco)

        this.produtos.forEach(produto => {
            if (nome === produto.nomeProduto || preco === produto.precoProduto){
                produtoAlvo = produto
            }
        })

        return produtoAlvo
    }
}