import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastro from "../Cadastrar/formularioCadastro";
import Lista from "../Listagem/lista";
import ListagemNome from "../ListagemID/listagemNome";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Listagem Geral'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Listagem Geral', 'Cadastro', 'Listagem por ID']} />
        if (this.state.tela === 'Listagem Geral') {
            return (
                <>
                    {barraNavegacao}
                    <Lista tema="#e3f2fd" />
                </>
            )
        }

        if (this.state.tela === 'Listagem por ID') {
            return (
                <>
                    {barraNavegacao}
                    <ListagemNome tema="#e3f2fd" />
                
                </>
            )
        }
        
        else {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastro tema="#e3f2fd" />
                </>
            )
        }
    }
}