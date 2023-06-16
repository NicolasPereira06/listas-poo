import { Component, SyntheticEvent } from "react";
import "../styles/popup.css";
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
}

interface ClienteData {
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataEmissaoCPF: string;
  rg: { numero: string; dataEmissao: string }[];
  telefone: {ddd: string; numero: string}[];
  pets: { nome: string; tipo: string; raca: string; genero: string }[];
}

export default class PopupCadastro extends Component<PopupProps> {

  msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Informações salvas com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a',
      customClass: {
        container: 'swal-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  exibirMensagemErro = (mensagem: string) => {
    Swal.fire({
      title: "Erro",
      html: mensagem,
      icon: "error",
      confirmButtonColor: "#de940a",
      customClass: {
        container: "swal-container",
      },
    });
  };
  

  cadastrarCliente = async (event: SyntheticEvent) => {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
  
    let camposVazios = false;
  
    // Verificar campos vazios
    formData.forEach((value, key) => {
      if (!value) {
        camposVazios = true;
        return;
      }
    });
  
    if (camposVazios) {
      Swal.fire({
        title: "Erro",
        html: "Todos os campos devem ser preenchidos.",
        icon: "error",
        confirmButtonColor: "#de940a",
        customClass: {
          container: "swal-container",
        },
      });
      return;
    }
  
    const nome = formData.get("nome") as string;
    const cpf = formData.get("CPF") as string;
    const ddd = formData.get("DDD") as string;
  
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      Swal.fire({
        title: "Erro",
        html: "CPF inválido.",
        icon: "error",
        confirmButtonColor: "#de940a",
        customClass: {
          container: "swal-container",
        },
      });
      return;
    }
  
    if (ddd.length !== 2) {
      Swal.fire({
        title: "Erro",
        html: "DDD inválido.",
        icon: "error",
        confirmButtonColor: "#de940a",
        customClass: {
          container: "swal-container",
        },
      });
      return;
    }
  
    const clienteData: ClienteData = {
      nome: nome,
      nomeSocial: formData.get("nomeSocial") as string,
      cpf: cpf,
      dataEmissaoCPF: formData.get("dataEmissaoCPF") as string,
      rg: [
        {
          numero: formData.get("RG") as string,
          dataEmissao: formData.get("emissaoRG") as string,
        },
      ],
      telefone: [
        {
          ddd: ddd,
          numero: formData.get("numero") as string,
        }
      ],
      pets: [
        {
          nome: formData.get("nomePet") as string,
          tipo: formData.get("tipoPet") as string,
          raca: formData.get("racaPet") as string,
          genero: formData.get("generoPet") as string,
        },
      ],
    };
  
    try {
      const response = await fetch("http://localhost:3001/CadastroClientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });
  
      if (response.ok) {
        this.msgSucessoPost();
      } else {
        const errorMessage = await response.json();
        if (response.status === 400 && errorMessage === "Já existe um CPF cadastrado com esse número.") {
          Swal.fire({
            title: "Erro",
            html: "Já existe um CPF cadastrado com esse número.",
            icon: "error",
            confirmButtonColor: "#de940a",
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          Swal.fire({
            title: "Erro",
            html: "Já existe um CPF cadastrado com esse número.",
            icon: "error",
            confirmButtonColor: "#de940a",
            customClass: {
              container: "swal-container",
            },
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Erro",
        html: `Erro ao cadastrar o cliente: ${error}`,
        icon: "error",
        confirmButtonColor: "#de940a",
        customClass: {
          container: "swal-container",
        },
      });
    }
  };
  
  

  render() {
    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Cadastrar cliente</h2>
        <form onSubmit={this.cadastrarCliente}>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Nome"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="nomeSocial"
                  className="form-control"
                  placeholder="Nome social"
                />
              </div>
              <h2>Documentos:</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="CPF"
                  className="form-control"
                  placeholder="CPF"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="dataEmissaoCPF"
                  className="form-control"
                  placeholder="Data de emissão do CPF: dd/mm/yyyy"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="RG"
                  className="form-control"
                  placeholder="RG"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="emissaoRG"
                  className="form-control"
                  placeholder="Data de emissão do RG: dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="col">
              <h2>Contato:</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="DDD"
                  className="form-control"
                  placeholder="DDD"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="numero"
                  className="form-control"
                  placeholder="Número do Telefone"
                />
              </div>
              <h2>Pet:</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="nomePet"
                  className="form-control"
                  placeholder="Nome do Pet"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="tipoPet"
                  className="form-control"
                  placeholder="Tipo do pet"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="racaPet"
                  className="form-control"
                  placeholder="Raça do pet"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="generoPet"
                  className="form-control"
                  placeholder="Gênero do pet"
                />
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={this.props.onClose}
          >
            Fechar
          </button>
          <button className="btn btn-outline-success" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    );
  }
}