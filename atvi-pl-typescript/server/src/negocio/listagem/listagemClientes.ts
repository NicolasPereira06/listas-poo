import Cliente from "../../modelo/cliente";
import Pet from "../../modelo/pet";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    private rg: Array<RG>
    private telefone: Array<Telefone>
    private pets: Array<Pet>
    constructor(clientes: Array<Cliente>, rg: Array<RG>, telefone:Array<Telefone>, pets: Array<Pet>) {
        super()
        this.clientes = clientes
        this.rg = rg
        this.telefone = telefone
        this.pets = pets
    }
    public listar(): void {
        if (this.clientes.length === 0 || this.clientes.every(cliente => cliente.nome.trim() === '')) {
            console.log(`Não há clientes para listar.\n`);
            return;
        }
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            const rgs = cliente.getRgs.map(rg => rg.getValor);
            console.log(`RGs: ` + rgs.join(", ") + ".");
            const telefonesFiltrados = cliente.getTelefones.map((telefoneFiltrado) => {
                const ddd = telefoneFiltrado.getDdd;
                const telefoneInteiro = telefoneFiltrado.getNumero
                return `(${ddd})${telefoneInteiro}`
            });
                console.log(`Telefones: ${telefonesFiltrados.join(", ")}.`);
            cliente.getPets.forEach(pet => {
                if (pet.getNome.trim() !== '') {
                    console.log(`Nome do pet: ` + pet.getNome);
                }
                if (pet.getTipo.trim() !== '') {
                    console.log(`Tipo do pet: ` + pet.getTipo);
                }
                if (pet.getRaca.trim() !== '') {
                    console.log(`Raça do pet: ` + pet.getRaca);
                }
                if (pet.getGenero.trim() !== '') {
                    console.log(`Gênero do pet: ` + pet.getGenero);
                }
            });
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}