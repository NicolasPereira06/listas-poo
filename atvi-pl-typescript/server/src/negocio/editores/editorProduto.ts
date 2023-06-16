import Entrada from "../../io/entrada"
import Produto from "../../modelo/produto";

export default class EditorProduto {
    private entrada: Entrada
    constructor() {
        this.entrada = new Entrada()
    }

    public editar(produto: Produto): void {
        console.log(`\nInício da edição do produto`);
        let nome = this.entrada.receberTexto(`Por favor informe o novo nome do produto: `)
        let preco = this.entrada.receberTexto(`Por favor informe o novo preço do produto: R$ `)


        if (nome.trim() === '') {
            console.log(`Campo 'nome' é obrigatório. Edição cancelada.\n`);
            return;
        }

        if (preco.trim() === '') {
            console.log(`Campo 'preço' é obrigatório. Edição cancelada.\n`);
            return;
        }
    
        if (nome.trim() !== '') {
            produto.nomeProduto= nome;
        }
    
        if (preco.trim() !== '') {
            produto.precoProduto = preco;
        }
        console.log(`\nEdição concluída :)\n`);
    }
}