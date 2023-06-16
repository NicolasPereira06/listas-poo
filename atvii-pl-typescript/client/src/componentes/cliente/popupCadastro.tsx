import { Component } from "react";
import "../styles/popup.css";

interface PopupProps {
  onClose: () => void;
}

export default class PopupCadastro extends Component<PopupProps> {
  render() {
    return (
      <div className="popup">
        <h2>Cadastrar cliente</h2>
        <form>
          <div className="row">
            <div className="col">
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
              <h2>Documentos:</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="CPF"
                  className="form-control"
                  placeholder="CPF"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="EmissaoCPF"
                  className="form-control"
                  placeholder="Data de emissão do CPF no formato: dd/mm/yyyy"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="RG"
                  className="form-control"
                  placeholder="RG"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="emissaoRG"
                  className="form-control"
                  placeholder="Data de emissão do RG no formato: dd/mm/yyyy"
                />
              </div>
            </div>
            <div className="col">
              <h2>Contato:</h2>
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
                  placeholder="Número do Telefone"
                />
              </div>
              <h2>Pet:</h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="nomePet"
                  className="form-control"
                  placeholder="Nome do Pet"
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
            </div>
          </div>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={this.props.onClose}
          >
            Fechar
          </button>
          <button className="btn btn-outline-success" type="button">
            Cadastrar
          </button>
        </form>
      </div>
    );
  }
}