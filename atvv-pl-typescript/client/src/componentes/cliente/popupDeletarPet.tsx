import { Component, ChangeEvent } from "react";
import "../styles/popup.css";
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
  cpfCliente: string | undefined;
}

interface PopupState {
  indice: string;
  indiceEncontrado: boolean;
}

export default class PopupDeletarPet extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      indice: "",
      indiceEncontrado: false,
    };
  }

  msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Pet deletado com sucesso.",
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

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as unknown as Pick<PopupState, keyof PopupState>);
  };

  handleSubmit = () => {
    const { cpfCliente } = this.props;
    const { indice } = this.state;
  
    if (indice.trim() === "") {
      Swal.fire({
        title: "Erro",
        text: "Preencha o campo de índice.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: '#de940a',
        customClass: {
          container: 'swal-container',
        },
      });
      return; // Retorna para evitar a execução da exclusão
    }
  
    Swal.fire({
      title: "Confirmação",
      text: "Tem certeza que deseja excluir o pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#de940a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'swal-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/ExcluirPet/${indice}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Erro ao excluir o pet") {
              Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao excluir o pet.",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#de940a',
                customClass: {
                  container: 'swal-container',
                },
              });
            } else if (data.message === "Pet excluído com sucesso") {
              Swal.fire({
                title: "Exclusão bem-sucedida",
                text: "O pet foi excluído com sucesso.",
                icon: "success",
                showConfirmButton: true,
                confirmButtonColor: '#de940a',
                customClass: {
                  container: 'swal-container',
                },
              }).then(() => {
                window.location.reload(); // Atualiza a página após a exclusão bem-sucedida
              });
            }
          })
          .catch((error) => {
            console.error("Erro ao deletar o pet:", error);
          });
  
        return; // Retorna para evitar a execução da segunda tela de confirmação
      }
    });
  };
  render() {
    const { onClose } = this.props;
    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Deletar um pet</h2>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              name="indice"
              className="form-control"
              placeholder="Digite o nome do pet que deseja deletar:"
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-outline-danger" type="button" onClick={onClose}>
            Fechar
          </button>
          <button className="btn btn-outline-success" type="button" onClick={this.handleSubmit}>
            Deletar pet
          </button>
        </form>
      </div>
    );
  }
}
