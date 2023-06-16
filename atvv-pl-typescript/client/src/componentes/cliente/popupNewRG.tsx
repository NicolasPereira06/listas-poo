import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
  cpfCliente: string | undefined;
}

export default class PopupNewRG extends Component<PopupProps> {

  state = {
    numero: "",
    dataEmissao: "",
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddRG = () => {
    const { numero, dataEmissao } = this.state;
    const { cpfCliente } = this.props;
  
    // Verificar se algum campo está vazio
    if (numero.trim() === "" || dataEmissao.trim() === "") {
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
  
    const rg = {
      numero: numero,
      dataEmissao: dataEmissao,
      cpfCliente: cpfCliente // Adiciona o CPF do cliente
    };
  
    // Faz uma solicitação POST para cadastrar o novo RG
    fetch("http://localhost:3001/CadastroRG", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rg)
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
        console.error("Erro ao cadastrar o RG:", error);
        if (error.response) {
          console.log("Detalhes do erro:", error.response.data);
        }
      });
  };

  msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "RG cadastrado com sucesso.",
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
        <h2>Adicionar um novo RG</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="numero"
                    className="form-control"
                    placeholder="RG"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="dataEmissao"
                    className="form-control"
                    placeholder="Data de emissão do RG no formato: dd/mm/yyyy"
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
                onClick={this.handleAddRG}
            >
                Adicionar RG
            </button>
        </form>
      </div>
    );
  }
}