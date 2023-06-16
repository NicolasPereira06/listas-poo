import { Component } from "react";
import "../styles/popup.css"

interface PopupProps {
  onClose: () => void;
}

export default class PopupNewTelefone extends Component<PopupProps> {
  render() {
    return (
      <div className="popup">
        <h2>Adicionar um novo telefone</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="DDD"
                    className="form-control"
                    placeholder="DDD"
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="numero"
                    className="form-control"
                    placeholder="Número de telefone"
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
                Adicionar telefone
            </button>
        </form>
      </div>
    );
  }
}