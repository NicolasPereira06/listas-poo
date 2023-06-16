export default class Pet {
    private nome: string
    private tipo: string
    private raca: string
    private genero: string

    constructor(nome: string, raca: string, genero: string, tipo: string) {
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
    }

    public get getNome(){return this.nome}
    public get getRaca(){return this.raca}
    public get getGenero(){return this.genero}
    public get getTipo(){return this.tipo}

    public atualizarNome(novoNome: string): void {
        this.nome = novoNome
    }

    public atualizarTipo(novoTipo: string): void {
        this.tipo = novoTipo
    }

    public atualizarRaca(novaRaca: string): void {
        this.raca = novaRaca
    }

    public atualizarGenero(novoGenero: string): void {
        this.genero = novoGenero
    }
}