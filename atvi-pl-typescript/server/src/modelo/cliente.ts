import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>
    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public get getPets(): Array<Pet>{
        return this.pets
    }

    public adicionarPet(pet: Pet){
        this.pets.push(pet)
    }

    public removerPet(pet: Pet) {
        const index = this.pets.indexOf(pet)
        if (index !== -1) {
            this.pets.splice(index, 1)
        }
    }

    public adicionarRG(rg: RG) {
        this.rgs.push(rg)
    }

    public removerRG(rg: RG) {
        const index = this.rgs.indexOf(rg)
        if (index !== -1) {
            this.rgs.splice(index, 1)
        }
    }

    public adicionarTelefone(telefone: Telefone) {
        this.telefones.push(telefone)
    }

    public removerTelefone(telefone: Telefone) {
        const index = this.telefones.indexOf(telefone)
        if (index !== -1) {
            this.telefones.splice(index, 1)
        }
    }

    public consumirProduto(produto: Produto) {
        this.produtosConsumidos.push(produto)
    }

    public atribuirServico(servico: Servico) {
        this.servicosConsumidos.push(servico)
    }

    public atualizarCPF(novoValorCPF: string): void {
        this.cpf.atualizarValor(novoValorCPF);
    }

    public atualizarRG(indice: number, novoValorRG: string): void {
        const rg = this.rgs[indice];
        if (rg) {
            rg.atualizarValor(novoValorRG);
        } else {
            console.log(`O RG com índice ${indice} não existe. O valor não foi atualizado.\n`);
        }
    }

    public atualizarTelefone(indice: number, novoDDD: string, novoNumero: string): void {
        const telefones = this.getTelefones;
        if (indice >= 0 && indice < telefones.length) {
            const telefone = telefones[indice];
            telefone.atualizarDDD(novoDDD);
            telefone.atualizarNumero(novoNumero);
        } else {
            console.log(`Índice de telefone inválido. O telefone não foi atualizado.\n`);
        }
    }

    public atualizarPet(indice: number, novoNome: string, novoTipo: string, novaRaca: string, novoGenero: string): void {
        const pets = this.getPets;
        if (indice >= 0 && indice < pets.length) {
            const pet = pets[indice];
            pet.atualizarNome(novoNome);
            pet.atualizarTipo(novoTipo);
            pet.atualizarRaca(novaRaca);
            pet.atualizarGenero(novoGenero);
        } else {
            console.log(`Índice de pet inválido. O pet não foi atualizado.\n`);
        }
    }
    
}   