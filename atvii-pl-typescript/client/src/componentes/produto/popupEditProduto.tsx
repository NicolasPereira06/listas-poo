import { Component } from "react";
import "../styles/popup.css"

interface PopupProps {
  onClose: () => void;
}

export default class PopupEditProduto extends Component<PopupProps> {
  render() {
    return (
      <div className="popup">
        <h2>Editar produto</h2>
        <form>
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
                    name="preco"
                    className="form-control"
                    placeholder="Preço"
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
            >
                Editar produto
            </button>
        </form>
      </div>
    );
  }
}