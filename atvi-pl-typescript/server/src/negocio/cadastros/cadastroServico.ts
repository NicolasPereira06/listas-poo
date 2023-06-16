import Entrada from "../../io/entrada"
import Servico from "../../modelo/servico"
import CadastrarServico from "./cadastrarServico"

export default class CadastroServico extends CadastrarServico {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrarServico(): void {
        console.log(`\nInício do cadastro do Servico`);
        let nomeServico = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
        if (nomeServico.trim() === '') {
            console.log('O nome não pode estar vazio. Cadastro cancelado.');
            return;
        }

        if (this.servicos.some(servico => servico.nomeServico.toLowerCase() === nomeServico.toLowerCase())) {
            console.log('O nome do serviço informado já está cadastrado. Cadastro cancelado.');
            return;
        }

        let precoServico = this.entrada.receberTexto(`Por favor informe o preço do serviço: R$ `)
        if (precoServico.trim() === '') {
            console.log('O preço não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let servico = new Servico(nomeServico, precoServico);
        this.servicos.push(servico)
        console.log(`\nCadastro concluído :)\n`);
    }
}