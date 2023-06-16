import Servico from "../../modelo/servico"

export default class SelecionadorServico {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>){
        this.servicos = servicos
    }

    public selecionar(nome: string, preco: string) {
        let servicoAlvo = new Servico(nome, preco)

        this.servicos.forEach(servico => {
            if (nome === servico.nomeServico || preco === servico.precoServico){
                servicoAlvo = servico
            }
        })

        return servicoAlvo
    }
}