import { Component } from "react";
import "../styles/popup.css";

interface PopupProps {
  onClose: () => void;
}

export default class PopupEditarPet extends Component<PopupProps> {

  render() {
    const { onClose } = this.props;

    return (
      <div className="popup">
        <h2>Editar um pet</h2>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              name="nomePet"
              className="form-control"
              placeholder="Nome do pet"
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
          <div className="input-group mb-3">
            <input
              type="text"
              name="indice"
              className="form-control"
              placeholder="Índice do pet que deseja editar: (Início em 0)"
            />
          </div>
          <button className="btn btn-outline-danger" type="button" onClick={onClose}>
            Fechar
          </button>
          <button className="btn btn-outline-success" type="button">
            Editar pet
          </button>
        </form>
      </div>
    );
  }
}
