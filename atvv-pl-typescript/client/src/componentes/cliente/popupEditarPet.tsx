import { Component, ChangeEvent } from "react";
import "../styles/popup.css";
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
  cpfCliente: string | undefined;
}

interface PopupState {
  nomePet: string;
  tipoPet: string;
  racaPet: string;
  generoPet: string;
  indice: string;
}

export default class PopupEditarPet extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      nomePet: "",
      tipoPet: "",
      racaPet: "",
      generoPet: "",
      indice: "",
    };
  }
  

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupState, keyof PopupState>);
  };

  handleSubmit = () => {
    const { nomePet, tipoPet, racaPet, generoPet, indice } = this.state;
  
    // Verificar se algum campo está vazio
    if (
      nomePet.trim() === "" ||
      tipoPet.trim() === "" ||
      racaPet.trim() === "" ||
      generoPet.trim() === ""
    ) {
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
  
    const petData = {
      nomePet: nomePet,
      tipoPet: tipoPet,
      racaPet: racaPet,
      generoPet: generoPet,
      nomePett: indice
    };

    console.log(indice)
  
    // Enviar os dados atualizados para o servidor
    fetch(`http://localhost:3001/EditarPet/${indice}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Índice do pet não encontrado.");
        } else {
          throw new Error("Erro ao editar o pet: " + response.statusText);
        }
      })
      .then((data) => {
        console.log("Pet editado:", data);
        this.msgSucessoPost(); // Chamar função de sucesso após salvar
        this.props.onClose();
      })
      .catch((error) => {
        console.error("Erro ao editar o pet:", error);
        if (error.response) {
          console.log("Detalhes do erro:", error.response.data);
        }
        Swal.fire({
          title: "Erro",
          text: error.message,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: '#de940a',
          customClass: {
            container: 'swal-container',
          },
        });
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
  
  

  render() {
    const { onClose } = this.props;
    const { nomePet, tipoPet, racaPet, generoPet, indice } = this.state;

    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Editar um pet</h2>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              name="nomePet"
              className="form-control"
              placeholder="Nome do pet"
              value={nomePet}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="tipoPet"
              className="form-control"
              placeholder="Tipo do pet"
              value={tipoPet}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="racaPet"
              className="form-control"
              placeholder="Raça do pet"
              value={racaPet}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="generoPet"
              className="form-control"
              placeholder="Gênero do pet"
              value={generoPet}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="indice"
              className="form-control"
              placeholder="Digite o nome do pet que deseja editar:"
              value={indice}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-outline-danger" type="button" onClick={onClose}>
            Fechar
          </button>
          <button className="btn btn-outline-success" type="button" onClick={this.handleSubmit}>
            Editar pet
          </button>
        </form>
      </div>
    );
  }
}
