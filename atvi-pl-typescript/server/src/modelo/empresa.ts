import Cliente from "./cliente"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private rgs: Array<RG>
    private telefones: Array<Telefone>
    private pets: Array<Pet>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.rgs = []
        this.telefones = []
        this.pets = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public get getRgs() {
        return this.rgs
    }
    public get getTelefones() {
        return this.telefones
    }
    public get getPets() {
        return this.pets
    }
}