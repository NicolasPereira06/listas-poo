import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
  cpfCliente: string | undefined;
}

export default class PopupNewTelefone extends Component<PopupProps> {
  state = {
    ddd: "",
    numero: "",
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddTelefone = () => {
    const { ddd, numero } = this.state;
    const { cpfCliente } = this.props;
  
    // Verificar se algum campo está vazio
    if (ddd.trim() === "" || numero.trim() === "") {
      Swal.fire({
        title: "Erro",
        text: "Preencha todos os campos.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: '#de940a',
        customClass: {
          container: 'swal-container',
        },
      });
      return; // Retorna para evitar o envio dos dados
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
  
    const telefone = {
      ddd: ddd,
      numero: numero,
      cpfCliente: cpfCliente // Adiciona o CPF do cliente
    };
  
    const telefoneFormatado = `${telefone.ddd} ${telefone.numero}`;
  
    // Faz uma solicitação POST para cadastrar o novo telefone
    fetch("http://localhost:3001/CadastroTelefone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(telefone)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        this.msgSucessoPost();
        this.props.onClose();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o telefone:", error);
        if (error.response) {
          console.log("Detalhes do erro:", error.response.data);
        }
      });
  };

  msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Telefone cadastrado com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: "#de940a",
      customClass: {
        container: "swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };
  render() {
    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Adicionar um novo telefone</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="ddd"
                    className="form-control"
                    placeholder="DDD"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="numero"
                    className="form-control"
                    placeholder="Número de telefone"
                    onChange={this.handleInputChange}
                />
            </div>
            <button
                className="btn btn-outline-danger"
                type="button"
                onClick={this.props.onClose}
            >
                Fechar
            </button>
            <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.handleAddTelefone}
            >
                Adicionar telefone
            </button>
        </form>
      </div>
    );
  }
}