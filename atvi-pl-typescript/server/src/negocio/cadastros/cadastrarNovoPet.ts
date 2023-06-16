import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import Pet from "../../modelo/pet"

export default function cadastrarPet(cliente: Cliente) {
    let entrada = new Entrada()
    let nomePet = entrada.receberTexto('Por favor informe o nome de seu pet: ')
    if (nomePet.trim() === '') {
        console.log('O nome não pode estar vazio. Cadastro cancelado.');
        return;
    }
    let tipoPet = entrada.receberTexto('Por favor informe o tipo de seu pet: ')
    if (tipoPet.trim() === '') {
        console.log('O tipo não pode estar vazio. Cadastro cancelado.');
        return;
    }
    let racaPet = entrada.receberTexto('Por favor informe o raça de seu pet: ')
    if (racaPet.trim() === '') {
        console.log('A raça não pode estar vazia. Cadastro cancelado.');
        return;
    }
    let generoPet = entrada.receberTexto('Por favor informe o gênero de seu pet: ')
    if (generoPet.trim() === '') {
        console.log('O gênero não pode estar vazio. Cadastro cancelado.');
        return;
    }

    // Verificação se o pet já está cadastrado para o cliente
    if (cliente.getPets.some(pet => 
        pet.getNome.toLowerCase() === nomePet.toLowerCase() &&
        pet.getTipo.toLowerCase() === tipoPet.toLowerCase() &&
        pet.getRaca.toLowerCase() === racaPet.toLowerCase() &&
        pet.getGenero.toLowerCase() === generoPet.toLowerCase()
    )) {
        console.log('Esse pet já está cadastrado para o cliente. Cadastro cancelado.');
        return;
    }

    let novoPet = new Pet(nomePet, racaPet, generoPet, tipoPet)
    cliente.adicionarPet(novoPet)

    console.log(`\nPet adicionado com sucesso ao cliente.`)
}
