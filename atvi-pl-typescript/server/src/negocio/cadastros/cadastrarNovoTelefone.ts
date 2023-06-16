import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Telefone from "../../modelo/telefone";

export default function cadastrarTelefone(cliente: Cliente) {
    let entrada = new Entrada()

    let ddd = entrada.receberTexto(`Por favor informe o DDD de seu telefone: `);
    if (ddd.trim() === '') {
        console.log('O DDD não pode estar vazio. Cadastro cancelado.');
        return;
    }
    let numeroTelefone = entrada.receberTexto(`Por favor informe o número de seu telefone: `);
    if (numeroTelefone.trim() === '') {
        console.log('O número de telefone não pode estar vazio. Cadastro cancelado.');
        return;
    }

    const telefoneExistente = cliente.getTelefones.find(telefone => telefone.getNumero === numeroTelefone);
    if (telefoneExistente) {
        console.log('O Telefone já está cadastrado. Cadastro cancelado.');
        return;
    }

    let telefone = new Telefone(ddd, numeroTelefone)
    cliente.adicionarTelefone(telefone)

    console.log(`\nTelefone adicionado com sucesso ao cliente.`)
}