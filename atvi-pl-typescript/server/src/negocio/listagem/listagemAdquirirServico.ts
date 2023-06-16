import Cliente from "../../modelo/cliente";
import Servico from "../../modelo/servico";

export default function listarServicosAdquiridos(cliente: Cliente) {
    console.log(`\nLista de serviços adquiridos pelo cliente ${cliente.nome}`)

    const servicosConsumidosSet = new Set<Servico>();

    cliente.getServicosConsumidos.forEach((servico) => {
        servicosConsumidosSet.add(servico);
    });

    if (servicosConsumidosSet.size === 0) {
        console.log(`Nenhum serviço foi adquirido.`);
    } else {
        let index = 1;
        servicosConsumidosSet.forEach((servico) => {
            console.log(`${index} - ${servico.nomeServico}`);
            index++;
        });
    }

    console.log(`--------------------------------------`);
    console.log(`\n`);
}