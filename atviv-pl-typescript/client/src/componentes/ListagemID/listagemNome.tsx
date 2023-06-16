import React from "react";
import { Component } from "react";
import Swal from "sweetalert2";

type Props = {
  tema: string;
};

type State = {
  idCliente: any | null;
  clienteEncontrado: any | null;
  clienteSelecionadoLista: any | null;
};

export default class ListagemNome extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      idCliente: null,
      clienteEncontrado: null,
      clienteSelecionadoLista: null,
    };
  }

  handleIdClienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ idCliente: event.target.value });
  };

  buscarClientePorId(id: any) {
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Preencha o campo",
        showConfirmButton: true,
      });
    } else {
      fetch(`http://localhost:32831/cliente/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 500) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            clienteEncontrado: data,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "O Cliente Não Existe",
            text: error.message,
            showConfirmButton: true,
          });
        });
    }
  }
  

  render() {
    const { idCliente, clienteEncontrado, clienteSelecionadoLista } = this.state;

    return (
      <div className="container-fluid">
        <div className="input-group mb-3">
          <input
            type="text"
            value={idCliente}
            onChange={this.handleIdClienteChange}
            className="form-control"
            placeholder="Digite o ID do cliente que deseja listar:"
            aria-label="Digite o ID do cliente que deseja listar:"
            aria-describedby="basic-addon1"
          />
          <button
            className="btn btn-outline-primary"
            onClick={() => this.buscarClientePorId(idCliente)}
          >
            Buscar
          </button>
        </div>

        <div className="input-group mb-3">
          <h3>Cliente Filtrado:</h3>
        </div>
        <div className="list-group">
          {clienteEncontrado && (
            <a
              href="#"
              className="list-group-item"
              onClick={() => this.setState({ clienteSelecionadoLista: clienteEncontrado })}
            >
              <b>{clienteEncontrado.nome}</b>
            </a>
          )}
        </div>
        {clienteSelecionadoLista && (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{clienteSelecionadoLista.nome}</h5>
              <p className="card-text">
                {clienteSelecionadoLista.nomeSocial && (
                  <span>Nome social: {clienteSelecionadoLista.nomeSocial}<br /></span>
                )}
                {clienteSelecionadoLista.email && (
                  <span>Email: {clienteSelecionadoLista.email}<br /></span>
                )}
                {clienteSelecionadoLista.telefones.map((i: { ddd: string; numero: string }) => {
                  return (
                    <React.Fragment key={i.ddd + i.numero}>
                      <span>Telefone: ({i.ddd}) {i.numero}</span><br />
                    </React.Fragment>
                  );
                })}
              </p>
              <h5 className="card-title">Endereço: </h5>
              <p className="card-text">
                {clienteSelecionadoLista.endereco.estado && (
                  <span>Estado: {clienteSelecionadoLista.endereco.estado}<br /></span>
                )}
                {clienteSelecionadoLista.endereco.cidade && (
                  <span>Cidade: {clienteSelecionadoLista.endereco.cidade}<br /></span>
                )}
                {clienteSelecionadoLista.endereco.bairro && (
                  <span>Bairro: {clienteSelecionadoLista.endereco.bairro}<br /></span>
                )}
                {clienteSelecionadoLista.endereco.rua && (
                  <span>Rua: {clienteSelecionadoLista.endereco.rua}<br /></span>
                )}
                {clienteSelecionadoLista.endereco.numero && (
                  <span>Número: {clienteSelecionadoLista.endereco.numero}<br /></span>
                )}
                {clienteSelecionadoLista.endereco.codigoPostal && (
                  <span>Código Postal: {clienteSelecionadoLista.endereco.codigoPostal}<br /></span>
                )}
              </p>
              <h5 className="card-title">Informações adicionais: </h5>
              <p className="card-text">
                {clienteSelecionadoLista.endereco.informacoesAdicionais && (
                  <span>Informações Adicionais: {clienteSelecionadoLista.endereco.informacoesAdicionais}<br /></span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
