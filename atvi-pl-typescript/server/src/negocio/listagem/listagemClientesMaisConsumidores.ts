import Cliente from "../../modelo/cliente";
import ListagemClienteMaisConsumidor from "./listagemClienteMaisConsumidor";

export default class listagemClientesMaisConsumidores extends ListagemClienteMaisConsumidor {
    private clientes: Array<Cliente>

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listarClientesMaisConsumidores(): void {
        const listaConsumidores: Array<{ nome: string, totalConsumido: number }> = [];
    
        this.clientes.forEach(cliente => {
            const produtosConsumidos = cliente.getProdutosConsumidos;
            const servicosConsumidos = cliente.getServicosConsumidos;
            const totalConsumido = produtosConsumidos.length + servicosConsumidos.length;
    
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
            console.log(`\nLista dos 10 clientes que mais consumiram produtos ou serviços:`);
            for (let i = 0; i < 10 && i < listaConsumidores.length; i++) {
                console.log(`${i + 1}. ${listaConsumidores[i].nome}: ${listaConsumidores[i].totalConsumido} itens consumidos.`);
            }
        }
    }
    
    
}