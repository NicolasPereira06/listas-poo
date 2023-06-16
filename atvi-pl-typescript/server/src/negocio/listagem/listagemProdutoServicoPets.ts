import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"
import ListagemProdutosServicosPet from "./listagemProdutosServicosPet"
export default class ListagemProdutoServicoPets extends ListagemProdutosServicosPet {
    private clientes: Array<Cliente>
    private pets: Array<Pet>

    constructor(clientes: Array<Cliente>, pets: Array<Pet>) {
        super()
        this.clientes = clientes
        this.pets = pets
    }

    public listarProdutosServicosPet(): void {
      const listaProdutosServicosPorTipoERaca: {
        [key: string]: {
          [key: string]: { quantidade: number; produtos: Set<string>; servicos: Set<string> };
        };
      } = {};
    
      this.clientes.forEach((cliente) => {
        const pets = cliente.getPets;
    
        if (pets.length === 0) {
          return; // Ignora o cliente caso não tenha pets
        }
    
        pets.forEach((pet) => {
          const tipoPet = pet.getTipo;
          const racaPet = pet.getRaca;
          const produtosConsumidos = cliente.getProdutosConsumidos;
          const servicosConsumidos = cliente.getServicosConsumidos;
    
          if (!tipoPet || !racaPet) {
            return; // Ignora o pet caso o tipo ou raça não sejam válidos
          }
    
          if (!(tipoPet in listaProdutosServicosPorTipoERaca)) {
            listaProdutosServicosPorTipoERaca[tipoPet] = {};
          }
    
          if (!(racaPet in listaProdutosServicosPorTipoERaca[tipoPet])) {
            listaProdutosServicosPorTipoERaca[tipoPet][racaPet] = {
              quantidade: 0,
              produtos: new Set<string>(),
              servicos: new Set<string>(),
            };
          }
    
          produtosConsumidos.forEach((produto) => {
            listaProdutosServicosPorTipoERaca[tipoPet][racaPet].quantidade += 1;
            listaProdutosServicosPorTipoERaca[tipoPet][racaPet].produtos.add(produto.nomeProduto);
          });
    
          servicosConsumidos.forEach((servico) => {
            listaProdutosServicosPorTipoERaca[tipoPet][racaPet].quantidade += 1;
            listaProdutosServicosPorTipoERaca[tipoPet][racaPet].servicos.add(servico.nomeServico);
          });
        });
      });
    
      console.log(`\nListagem dos serviços ou produtos mais consumidos por tipo e raça de pets:`);
    
      if (Object.keys(listaProdutosServicosPorTipoERaca).length === 0) {
        console.log(`Nenhum pet consumiu um produto ou serviço ainda.`);
      } else {
        const listaOrdenada = Object.entries(listaProdutosServicosPorTipoERaca)
        .sort(([, a], [, b]) => b.quantidade > a.quantidade ? -1 : 1);
    
        listaOrdenada.forEach(([tipoPet, racasPets]) => {
          const petsConsumidos = Object.values(racasPets).some((racaPet) => racaPet.quantidade > 0);
    
          if (!petsConsumidos) {
            console.log("Nenhum produto ou serviço foi consumido ainda por pets.")
            return; // Ignora o tipo de pet caso nenhum pet tenha consumido produtos ou serviços
          }
    
          console.log(`\nTipo de Pet: ${tipoPet}`);
    
          const racasOrdenadas = Object.entries(racasPets)
            .sort(([, a], [, b]) => b.quantidade - a.quantidade);
    
          racasOrdenadas.forEach(([racaPet, { quantidade, produtos, servicos }]) => {
            console.log(`Raça: ${racaPet}`);
            console.log(`Quantidade: ${quantidade} itens consumidos.`);
            console.log(`Produtos: ${[...produtos].join(", ")}`);
            console.log(`Serviços: ${[...servicos].join(", ")}`);
          });
        });
      }
    
      console.log(`--------------------------------------`);
      console.log(`\n`);
    }
}