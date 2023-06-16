import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";

export default class EditorCliente {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    public editar(cliente: Cliente): void {
        console.log(`\nInício da edição do cliente`);
        let nome = this.entrada.receberTexto(`Por favor, informe o novo nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor, informe o novo nome social do cliente: `);

        if (nome.trim() !== '') {
            cliente.nome = nome;
        }

        if (nomeSocial.trim() !== '') {
            cliente.nomeSocial = nomeSocial;
        }

        let valorCPF = this.entrada.receberTexto(`Por favor, informe o novo CPF do cliente: `);

        if (valorCPF.trim() !== '') {
            if (valorCPF.length === 11 && /^\d{11}$/.test(valorCPF)) {
                // CPF válido, faça a edição
                cliente.getCpf.atualizarValor(valorCPF);
            } else {
                console.log("CPF Inválido");
            }
        }
        let valorRG = this.entrada.receberTexto(`Por favor, informe o novo RG do cliente: `);
    
        if (valorRG.trim() !== '') {
            let rgIndex = this.entrada.receberNumero(`Por favor, informe o índice do RG que deseja editar (Começando em 0): `);
            if (rgIndex >= 0 && rgIndex < cliente.getRgs.length) {
                cliente.atualizarRG(rgIndex, valorRG);
            } else {
                console.log(`Índice de RG inválido. O RG não foi atualizado.\n`);
            }
        }

        let valorDDD = this.entrada.receberTexto(`Por favor, informe o novo DDD do telefone: `);
        let valorNumero = this.entrada.receberTexto(`Por favor, informe o novo número do telefone: `);
        
        if (valorDDD.trim() !== '' && valorNumero.trim() !== '') {
            let telefoneIndex = this.entrada.receberNumero(`Por favor, informe o índice do telefone que deseja editar: `);
            cliente.atualizarTelefone(telefoneIndex, valorDDD, valorNumero);
        }
        
        

        let valorNomePet = this.entrada.receberTexto(`Por favor, informe o novo nome do pet: `);
        let valorTipoPet = this.entrada.receberTexto(`Por favor, informe o novo tipo do pet: `);
        let valorRacaPet = this.entrada.receberTexto(`Por favor, informe a nova raça do pet: `);
        let valorGeneroPet = this.entrada.receberTexto(`Por favor, informe o novo gênero do pet: `);
        
        if (valorNomePet.trim() !== '' && valorTipoPet.trim() !== '' && valorRacaPet.trim() !== '' && valorGeneroPet.trim() !== '') {
            let petIndex = this.entrada.receberNumero(`Por favor, informe o índice do pet que deseja editar: `);
            cliente.atualizarPet(petIndex, valorNomePet, valorTipoPet, valorRacaPet, valorGeneroPet);
        } else {
            console.log(`Valores inválidos para o pet. O pet não foi atualizado.\n`);
        }      
        
        console.log(`\nEdição finalizada :)\n`);
    }
}