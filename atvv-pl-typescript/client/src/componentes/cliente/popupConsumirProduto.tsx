import { Component } from "react";
import "../styles/popup.css";
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
}

interface PopupState {
  cpfCliente: string;
  nomeProdutoConsumir: string;
}

export default class PopupConsumirProduto extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      cpfCliente: "",
      nomeProdutoConsumir: "",
    };
  }

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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupState, keyof PopupState>);
  };

  handleSubmit = () => {
    const { cpfCliente, nomeProdutoConsumir } = this.state;
  
    let camposVazios = false;
  
    if (!cpfCliente || !nomeProdutoConsumir) {
      camposVazios = true;
    }
  
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
  
    fetch("http://localhost:3001/ConsumirProduto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpfCliente, nomeProduto: nomeProdutoConsumir }),
    })
      .then((response) => {
        if (response.ok) {
          this.msgSucessoPost();
          return response.json();
        } else if (response.status === 404) {
          throw new Error("CPF ou produto não encontrado.");
        } else {
          throw new Error("CPF ou produto não encontrado.");
        }
      })
      .then((data) => {
        if (data.error) {
          Swal.fire({
            title: "Erro",
            html: "CPF ou produto não encontrado.",
            icon: "error",
            confirmButtonColor: "#de940a",
            customClass: {
              container: "swal-container",
            },
          });
        } else {
          console.log(data);
          this.props.onClose();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro",
          html: error.message,
          icon: "error",
          confirmButtonColor: "#de940a",
          customClass: {
            container: "swal-container",
          },
        });
        console.error(error);
      });
  };
  
  

  render() {
    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Consumir um produto</h2>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              name="cpfCliente"
              className="form-control"
              placeholder="Digite o CPF do cliente"
              value={this.state.cpfCliente}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="nomeProdutoConsumir"
              className="form-control"
              placeholder="Digite o nome do produto que deseja consumir"
              value={this.state.nomeProdutoConsumir}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-outline-danger" type="button" onClick={this.props.onClose}>
            Fechar
          </button>
          <button className="btn btn-outline-success" type="button" onClick={this.handleSubmit}>
            Consumir produto
          </button>
        </form>
      </div>
    );
  }
}
