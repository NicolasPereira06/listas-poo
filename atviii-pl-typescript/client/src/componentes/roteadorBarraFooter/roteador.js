import React, { useState, useEffect } from "react";
import BarraNavegacao from "./barraNavegacao";
import Home from "../home";
import Cliente from "../cliente/cliente";
import Produto from "../produto/produto";
import Servico from "../servico/servico";
import Dashboard from "../dashboard/dashboard";

export default function Roteador() {
  const [tela, setTela] = useState(localStorage.getItem("telaAtual") || "Home");

  const selecionarView = (novaTela, evento) => {
    evento.preventDefault();
    setTela(novaTela);
    localStorage.setItem("telaAtual", novaTela);
  };

  useEffect(() => {
    localStorage.setItem("telaAtual", tela);
  }, [tela]);

  const barraNavegacao = (
    <BarraNavegacao
      seletorView={selecionarView}
      tema="#e3f2fd"
      botoes={["Home", "Cliente", "Produtos", "Serviços", "Dashboard"]}
    />
  );

  switch (tela) {
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