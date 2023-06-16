import React, { Component, FormEvent } from "react";
import Swal from "sweetalert2";

type Props = {
  tema: string;
};

type State = {
  nome: string;
  nomeSocial: string;
  email: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
  numeroTelefone: string,
  ddd: string
};

export default class FormularioCadastro extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: "",
      nomeSocial: "",
      email: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
      numeroTelefone: "",
      ddd: ""
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
  
    const {
      nome,
      nomeSocial,
      email,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      codigoPostal,
      informacoesAdicionais,
      ddd,
      numeroTelefone,
    } = this.state;
  
    const endereco = {
      estado,
      cidade,
      bairro,
      rua,
      numero,
      codigoPostal,
      informacoesAdicionais,
    };
  
    const telefone = {
      ddd,
      numero,
    };

    const cliente = {
        nome,
        nomeSocial,
        email: email || null,
        endereco: endereco || null,
        telefones: [telefone]
    };

    if (!nome || 
        !nomeSocial ||
        !email ||
        !ddd ||
        !numeroTelefone ||
        !estado ||
        !cidade ||
        !bairro ||
        !rua ||
        !numero ||
        !codigoPostal ||
        !informacoesAdicionais
      )
    {
      Swal.fire({
        icon: "error",
        title: "Preencha todos os campos.",
        showConfirmButton: true
      });
    }
    else {
      fetch("http://localhost:32831/cliente/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Erro ao cadastrar o cliente:", error);
      });
      Swal.fire({
        icon: "success",
        title: "Cliente cadastrado com sucesso.",
        showConfirmButton: true
      });
    }
  }

  render() {
    const { tema } = this.props;
    const {
      nome,
      nomeSocial,
      email,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      codigoPostal,
      informacoesAdicionais,
      numeroTelefone,
      ddd
    } = this.state;

    return (
      <div className="container-fluid">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="input-group mb-3">
            <h3> Cadastro do Cliente:</h3>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Nome"
              aria-label="Nome"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="nomeSocial"
              value={nomeSocial}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Nome social"
              aria-label="Nome social"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="ddd"
              value={ddd}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="DDD"
              aria-label="DDD"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="numeroTelefone"
              value={numeroTelefone}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Numero do telefone"
              aria-label="Numero do telefone"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="estado"
              value={estado}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Estado"
              aria-label="Estado"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="cidade"
              value={cidade}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Cidade"
              aria-label="Cidade"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="bairro"
              value={bairro}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Bairro"
              aria-label="Bairro"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="rua"
              value={rua}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Rua"
              aria-label="Rua"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="numero"
              value={numero}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Número"
              aria-label="Número"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="codigoPostal"
              value={codigoPostal}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Código Postal"
              aria-label="CodigoPostal"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="informacoesAdicionais"
              value={informacoesAdicionais}
              onChange={(e) => this.handleInputChange(e)}
              className="form-control"
              placeholder="Informações adicionais"
              aria-label="InformaçõesAdicionais"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <button
              className="btn btn-outline-secondary"
              type="submit"
              style={{ background: tema }}
            >
              Cadastrar cliente
            </button>
          </div>
        </form>
      </div>
    );
  }
}