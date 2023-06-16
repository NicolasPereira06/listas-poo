import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
  cpfCliente: string | undefined;
}

export default class PopupNewPet extends Component<PopupProps> {
    state = {
        nomePet: "",
        tipoPet: "",
        racaPet: "",
        generoPet: ""
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddPet = () => {
      const { nomePet, tipoPet, racaPet, generoPet } = this.state;
      const { cpfCliente } = this.props;
    
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
          confirmButtonColor: "#de940a",
          customClass: {
            container: "swal-container",
          },
        });
        return; // Retorna para evitar o envio dos dados
      }
    
      const pet = {
        nomePet: nomePet,
        tipoPet: tipoPet,
        racaPet: racaPet,
        generoPet: generoPet,
        cpfCliente: cpfCliente, // Adiciona o CPF do cliente
      };
    
      // Faz uma solicitação POST para cadastrar o novo pet
      fetch("http://localhost:3001/CadastroPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao cadastrar o pet: " + response.statusText);
          }
        })
        .then((data) => {
          console.log(data); // Exibe o novo pet cadastrado
          this.msgSucessoPost(); // Chama a função de sucesso após o cadastro
          this.props.onClose(); // Fecha o popup após o cadastro
        })
        .catch((error) => console.error("Erro ao cadastrar o pet:", error));
    };
    
    msgSucessoPost = () => {
      Swal.fire({
        title: "Sucesso",
        html: "Pet cadastrado com sucesso.",
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
        <h2>Adicionar um novo pet</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nomePet"
                    className="form-control"
                    placeholder="Nome do pet"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="tipoPet"
                    className="form-control"
                    placeholder="Tipo do pet"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="racaPet"
                    className="form-control"
                    placeholder="Raça do pet"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="generoPet"
                    className="form-control"
                    placeholder="Gênero do pet"
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
                onClick={this.handleAddPet}
            >
                Adicionar pet
            </button>
        </form>
      </div>
    );
  }
}