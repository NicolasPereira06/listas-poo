import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";

export default function listarProdutosConsumidos(cliente: Cliente) {
    console.log(`\nLista de produtos consumidos pelo cliente ${cliente.nome}`)

    const produtosConsumidosSet = new Set<Produto>();

    cliente.getProdutosConsumidos.forEach((produto) => {
        produtosConsumidosSet.add(produto);
    });

    if (produtosConsumidosSet.size === 0) {
        console.log(`Nenhum produto foi consumido.`);
    } else {
        let index = 1;
        produtosConsumidosSet.forEach((produto) => {
            console.log(`\n${index} - ${produto.nomeProduto}`);
            index++;
        });
    }

    console.log(`--------------------------------------`);
    console.log(`\n`);
}
