import Entrada from "../../io/entrada"
import Cliente from "../../modelo/cliente"
import CPF from "../../modelo/cpf"
import Pet from "../../modelo/pet"
import RG from "../../modelo/rg"
import Telefone from "../../modelo/telefone"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private pets: Array<Pet>
    private rgs: Array<RG>
    private telefones: Array<Telefone>
    constructor(clientes: Array<Cliente>,rgs: Array<RG>, telefones: Array<Telefone>, pets: Array<Pet>) {
        super()
        this.clientes = clientes
        this.pets = pets
        this.rgs = rgs
        this.telefones = telefones
        this.telefones = telefones
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        if (nome.trim() === '') {
            console.log('O nome não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        if (nomeSocial.trim() === '') {
            console.log('O nome social não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        if (valor.trim() === '') {
            console.log('O número do CPF não pode estar vazio. Cadastro cancelado.');
            return;
        }

        if (valor.length !== 11 || !/^\d+$/.test(valor)) {
            console.log('CPF Inválido');
            return;
        }

        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        if (data.trim() === '') {
            console.log('A data de emissão do CPF não pode estar vazia. Cadastro cancelado.');
            return;
        }
        let valorRg = this.entrada.receberTexto(`Por favor informe o número do rg: `);
        if (valorRg.trim() === '') {
            console.log('O número do RG não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let dataRg = this.entrada.receberTexto(`Por favor informe a data de emissão do rg, no padrão dd/mm/yyyy: `);
        if (dataRg.trim() === '') {
            console.log('A data de emissão do RG não pode estar vazia. Cadastro cancelado.');
            return;
        }
        let ddd = this.entrada.receberTexto(`Por favor informe o DDD de seu telefone: `);
        if (ddd.trim() === '') {
            console.log('O DDD do número não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let numero = this.entrada.receberTexto(`Por favor informe o número de seu telefone: `);
        if (numero.trim() === '') {
            console.log('O Número de telefone não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let petNome = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
        if (petNome.trim() === '') {
            console.log('O nome do pet não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let petTipo = this.entrada.receberTexto(`Pro favor informe o tipo do seu pet: `)
        if (petTipo.trim() === '') {
            console.log('O tipo do pet não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let petRaca = this.entrada.receberTexto(`Por favor informe a raça do seu pet: `)
        if (petRaca.trim() === '') {
            console.log('A raca do pet não pode estar vazia. Cadastro cancelado.');
            return;
        }
        let petGenero = this.entrada.receberTexto(`Por favor informe o genero do seu pet: `)
        if (petGenero.trim() === '') {
            console.log('O genero do pet não pode estar vazio. Cadastro cancelado.');
            return;
        }
        let partesData = data.split('/')
        let partesDataRg = dataRg.split('/')
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let anoRg = new Number(partesDataRg[2].valueOf()).valueOf()
        let mesRg = new Number(partesDataRg[1].valueOf()).valueOf()
        let diaRg = new Number(partesDataRg[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia)
        let dataEmissaoRg = new Date(anoRg, mesRg, diaRg)
        let cpf = new CPF(valor, dataEmissao);
        let rg = new RG(valorRg, dataEmissaoRg)

        if (this.clientes.some(cliente => cliente.getCpf.getValor === cpf.getValor)) {
            console.log('O CPF informado já está cadastrado. Cadastro cancelado.');
            return;
        }
        
        let cliente = new Cliente(nome, nomeSocial, cpf);
        let pet = new Pet(petNome, petRaca, petGenero, petTipo)
        let telefone = new Telefone(ddd, numero)
        cliente.getRgs.push(rg)
        cliente.getTelefones.push(telefone)
        cliente.getPets.push(pet);
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}