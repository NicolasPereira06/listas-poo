import Entrada from "../../io/entrada"
import Produto from "../../modelo/produto"
import CadastrarProduto from "./cadastrarProduto"

export default class CadastroProduto extends CadastrarProduto {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public cadastrarProduto(): void {
        console.log(`\nInício do cadastro do Produto`);
        let nomeProduto = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
        if (nomeProduto.trim() === '') {
            console.log('O nome não pode estar vazio. Cadastro cancelado.');
            return;
        }

        if (this.produtos.some(produto => produto.nomeProduto.toLowerCase() === nomeProduto.toLowerCase())) {
            console.log('O nome do produto informado já está cadastrado. Cadastro cancelado.');
            return;
        }

        let precoProduto = this.entrada.receberTexto(`Por favor informe o preço do produto: R$ `)
        if (precoProduto.trim() === '') {
            console.log('O preço não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let produto = new Produto(nomeProduto, precoProduto);
        this.produtos.push(produto)
        console.log(`\nCadastro concluído :)\n`);
    }
}