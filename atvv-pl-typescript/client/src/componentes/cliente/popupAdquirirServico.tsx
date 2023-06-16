import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
}

interface PopupState {
  cpfCliente: string;
  nomeServicoConsumir: string;
}

export default class PopupAdquirirServico extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      cpfCliente: "",
      nomeServicoConsumir: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupState, keyof PopupState>);
  };

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

  handleSubmit = () => {
    const { cpfCliente, nomeServicoConsumir } = this.state;
  
    // Verificar campos vazios
    if (!cpfCliente || !nomeServicoConsumir) {
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
  
    fetch("http://localhost:3001/AdquirirServico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpfCliente, nomeServico: nomeServicoConsumir }),
    })
      .then((response) => {
        if (response.ok) {
          this.msgSucessoPost();
          return response.json();
        } else if (response.status === 404) {
          throw new Error("CPF ou serviço não encontrado.");
        } else {
          throw new Error("Erro ao consumir o serviço: " + response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        this.props.onClose();
      })
      .catch((error) => {
        Swal.fire({
          title: "Erro",
          html: "CPF ou serviço não encontrado.",
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
        <h2>Adquirir um serviço</h2>
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
                  name="nomeServicoConsumir"
                  className="form-control"
                  placeholder="Digite o nome do serviço que deseja adquirir"
                  value={this.state.nomeServicoConsumir}
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
              onClick={this.handleSubmit}
          >
              Adquirir serviço
          </button>
        </form>
      </div>
    );
  }
}