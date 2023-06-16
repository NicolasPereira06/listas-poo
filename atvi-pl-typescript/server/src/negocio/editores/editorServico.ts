import Entrada from "../../io/entrada"
import Servico from "../../modelo/servico";

export default class EditorServico {
    private entrada: Entrada
    constructor() {
        this.entrada = new Entrada()
    }

    public editar(servico: Servico): void {
        console.log(`\nInício da edição do servico`);
        let nome = this.entrada.receberTexto(`Por favor informe o novo nome do servico: `)
        let preco = this.entrada.receberTexto(`Por favor informe o novo preço do servico: R$ `)

        if (nome.trim() === '') {
            console.log(`Campo 'nome' é obrigatório. Edição cancelada.\n`);
            return;
        }

        if (preco.trim() === '') {
            console.log(`Campo 'preço' é obrigatório. Edição cancelada.\n`);
            return;
        }
    
        if (nome.trim() !== '') {
            servico.nomeServico= nome;
        }
    
        if (preco.trim() !== '') {
            servico.precoServico= preco;
        }
        console.log(`\nEdição concluída :)\n`);
    }
}