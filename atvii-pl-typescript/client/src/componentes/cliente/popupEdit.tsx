import { Component } from "react";
import "../styles/popup.css"

interface PopupProps {
  onClose: () => void;
}

export default class Popup extends Component<PopupProps> {
  render() {
    return (
      <div className="popup">
        <h2>Editar cliente</h2>
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
                    name="nomeSocial"
                    className="form-control"
                    placeholder="Nome social"
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
                Editar cliente
            </button>
        </form>
      </div>
    );
  }
}