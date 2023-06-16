import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";
import { UUID } from "crypto";

interface PopupProps {
  onClose: () => void;
  cliente: ClienteData;

}

interface ClienteData {
  id: UUID;
  nome: string;
  nomeSocial: string;
  cpf: string;
}

interface PopupState {
  nome: string;
  nomeSocial: string;
}

export default class Popup extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      nome: props.cliente.nome,
      nomeSocial: props.cliente.nomeSocial
    };
  }

  handleEditarCliente = () => {
    const { nome, nomeSocial } = this.state;
    const { cliente } = this.props;

    // Verificar se algum campo está vazio
    if (nome.trim() === "" || nomeSocial.trim() === "") {
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

    // Enviar os dados atualizados para o servidor
    fetch(`http://localhost:3001/EditarCliente/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, nomeSocial }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao editar o cliente: " + response.statusText);
        }
      })
      .then((data) => {
        // Lidar com a resposta do servidor (opcional)
        console.log("Cliente editado:", data);
        this.msgSucessoPost(); // Chamar função de sucesso após salvar
        this.props.onClose();
      })
      .catch((error) => {
        console.error("Erro ao editar cliente:", error);
      });
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
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupState, keyof PopupState>);
  };

  render() {
    const { onClose } = this.props;
    const { nome, nomeSocial } = this.state;

    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Editar cliente</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nome"
                    className="form-control"
                    placeholder="Nome"
                    value={nome}
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nomeSocial"
                    className="form-control"
                    placeholder="Nome social"
                    value={nomeSocial}
                    onChange={this.handleInputChange}
                />
            </div>
            <button
                className="btn btn-outline-danger"
                type="button"
                onClick={onClose}
            >
                Fechar
            </button>
            <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.handleEditarCliente}
            >
                Editar cliente
            </button>
        </form>
      </div>
    );
  }
}
