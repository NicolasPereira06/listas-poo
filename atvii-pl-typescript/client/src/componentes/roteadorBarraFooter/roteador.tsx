import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import Home from "../home";
import Cliente from "../cliente/cliente";
import Produto from "../produto/produto";
import Servico from "../servico/servico";
import Dashboard from "../dashboard/dashboard";

type state = {
  tela: string;
};

export default class Roteador extends Component<{}, state> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    const telaAtual = localStorage.getItem("telaAtual") || "Home";
    this.state = {
      tela: telaAtual
    };
    this.selecionarView = this.selecionarView.bind(this);
  }

  selecionarView(novaTela: string, evento: Event) {
    evento.preventDefault();
    this.setState(
      {
        tela: novaTela
      },
      () => {
        localStorage.setItem("telaAtual", novaTela);
      }
    );
  }

  render() {
    const barraNavegacao = (
      <BarraNavegacao
        seletorView={this.selecionarView}
        tema="#e3f2fd"
        botoes={["Home", "Cliente", "Produtos", "Serviços", "Dashboard"]}
      />
    );

    switch (this.state.tela) {
      case "Home":
        return (
          <>
            {barraNavegacao}
            <Home />
          </>
        );
      case "Cliente":
        return (
          <>
            {barraNavegacao}
            <Cliente />
          </>
        );
      case "Produtos":
        return (
          <>
            {barraNavegacao}
            <Produto />
          </>
        );
      case "Serviços":
        return (
          <>
            {barraNavegacao}
            <Servico />
          </>
        );
      default:
        return (
          <>
            {barraNavegacao}
            <Dashboard />
          </>
        );
    }
  }
}