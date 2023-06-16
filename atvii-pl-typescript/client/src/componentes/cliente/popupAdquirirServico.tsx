import { Component } from "react";
import "../styles/popup.css"

interface PopupProps {
  onClose: () => void;
}


export default class PopupAdquirirServico extends Component<PopupProps> {
  render() {
    return (
      <div className="popup">
        <h2>Adquirir um serviço</h2>
        <form>
            <div className="input-group mb-3">
              <input
                type="text"
                name="cpfCliente"
                className="form-control"
                placeholder="Digite o CPF do cliente"
              />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nomeServicoConsumir"
                    className="form-control"
                    placeholder="Digite o nome do serviço que deseja adquirir"
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
                Adquirir serviço
            </button>
        </form>
      </div>
    );
  }
}