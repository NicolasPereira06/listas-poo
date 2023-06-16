import Servico from "../../modelo/servico";
import ListagemServicos from "./listagemServicos";

export default class ListagemServico extends ListagemServicos {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
    }
    public listarServicos(): void {
        if (this.servicos.length === 0 || this.servicos.every(servico => servico.nomeServico.trim() === '')) {
            console.log(`Não há serviços para listar.\n`);
            return;
        }
        console.log(`\nLista de todos os serviços:`);
        const servicosFormatados = this.servicos.map((servico) => {
            const nomeDoServico = servico.nomeServico
            const precoDoServico = servico.precoServico
            let precoFormatadoServico: number = parseFloat(precoDoServico);
            return `${nomeDoServico}: R$ ${precoFormatadoServico.toFixed(2)}`
        })
        console.log(servicosFormatados.join("\n"));
        console.log(`\n`);
    }
}