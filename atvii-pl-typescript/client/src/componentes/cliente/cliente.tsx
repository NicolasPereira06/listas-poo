import { Component } from 'react';
import Popup from '../cliente/popupEdit';
import "../styles/definitionPopup.css"
import PopupCadastro from './popupCadastro';
import PopupNewPet from '../cliente/popupNewPet';
import PopupNewRG from '../cliente/popupNewRG';
import PopupNewTelefone from '../cliente/popupNewTelefone';
import PopupConsumirProduto from './popupConsumirProduto';
import PopupAdquirirServico from './popupAdquirirServico';
import PopupEditarPet from './popupEditarPet';
import PopupDeletarPet from './popupDeletarPet';

export default class Cliente extends Component {
  state = {
    isPopupOpen: false,
    isPopupOpenCadastro: false,
    isPopupOpenPet: false,
    isPopupOpenRG: false,
    isPopupOpenTelefone: false,
    isPopupOpenConsumirProduto: false,
    isPopupOpenAdquirirServico: false,
    clienteSelecionado: null,
    screenHeight: window.innerHeight,
    isPopupOpenEditarPet: false,
    isPopupOpenDeletarPet: false,
  };
  
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenHeight: window.innerHeight });
  };

  handleClientClick = (cliente: string) => {
    if (this.state.clienteSelecionado === cliente) {
      this.setState({ clienteSelecionado: null });
    } else {
      this.setState({ clienteSelecionado: cliente });
    }
  };

  openPopup = () => {
    this.setState({ isPopupOpen: true });
  };

  closePopup = () => {
    this.setState({ isPopupOpen: false });
  };
  openPopupCadastro = () => {
    this.setState({ isPopupOpenCadastro: true });
  };

  closePopupCadastro = () => {
    this.setState({ isPopupOpenCadastro: false });
  };
  openPopupPet = () => {
    this.setState({ isPopupOpenPet: true });
  };

  closePopupPet = () => {
    this.setState({ isPopupOpenPet: false });
  };
  openPopupRG = () => {
    this.setState({ isPopupOpenRG: true });
  };

  closePopupRG = () => {
    this.setState({ isPopupOpenRG: false });
  };
  openPopupTelefone = () => {
    this.setState({ isPopupOpenTelefone: true });
  };

  closePopupTelefone = () => {
    this.setState({ isPopupOpenTelefone: false });
  };

  openPopupConsumirProduto = () => {
    this.setState({ isPopupOpenConsumirProduto: true });
  };

  closePopupConsumirProduto = () => {
    this.setState({  isPopupOpenConsumirProduto: false });
  };

  openPopupAdquirirServico  = () => {
    this.setState({ isPopupOpenAdquirirServico : true });
  };

  closePopupAdquirirServico  = () => {
    this.setState({ isPopupOpenAdquirirServico : false });
  };

  openPopupEditarPet  = () => {
    this.setState({ isPopupOpenEditarPet : true });
  };

  closePopupEditarPet  = () => {
    this.setState({ isPopupOpenEditarPet : false });
  };

  openPopupDeletarPet  = () => {
    this.setState({ isPopupOpenDeletarPet : true });
  };

  closePopupDeletarPet  = () => {
    this.setState({ isPopupOpenDeletarPet : false });
  };

  render() {
    const clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'];
    const { screenHeight } = this.state;

    return (
      <div className="container-fluid overflow-auto" style={{ height: `${screenHeight}px` }}>
        <button
            className="btn btn-outline-primary mb-2 ml-5"
            type="button"
            onClick={this.openPopupCadastro}
        >
            Cadastrar cliente
        </button>
        {this.state.isPopupOpenCadastro && (
            <div>
                <div className="overlay" onClick={this.closePopupCadastro}></div>
                <PopupCadastro onClose={this.closePopupCadastro} />
            </div>
        )}
        <div className="list-group">
          {clientes.map((cliente, index) => (
            <a
              key={index}
              href="#"
              className="list-group-item list-group-item-action"
              onClick={() => this.handleClientClick(cliente)}
            >
              {cliente}
            </a>
          ))}
        </div>

        {this.state.clienteSelecionado && (
          <div className="card mt-3" style={{marginBottom: '100px'}}>
            <div className="card-body">
                <h5 className="card-title">{this.state.clienteSelecionado}</h5>
                <p className="card-text">
                    <span>Nome social: Nomeado <br /></span>
                </p>
                <h5 className="card-title">Documentos:</h5>
                <p className="card-text">
                    <span>CPF: XXX.XXX.XXX/XX <br /></span>
                    <span>Data de Emissão do CPF: dd/mm/yyyy <br /></span>
                    <span>RG: XX.XXX.XXX-X<br /></span>
                    <span>Data de Emissão do RG: dd/mm/yyyy <br /></span>
                </p>
                <h5 className="card-title">Contato:</h5>
                <p className="card-text">
                    <span>Telefone: (XX) XXXXX-XXXX <br /></span>
                </p>
                <h5 className="card-title">Pets:</h5>
                <p className="card-text">
                    <span>Nome do pet: Nome 1 <br /></span>
                    <span>Tipo do pet: Tipo X <br /></span>
                    <span>Raça do pet: Raça Y <br /></span>
                    <span>Gênero do pet: Gênero W <br /></span>
                </p>
                <h5 className="card-title">Produtos consumidos:</h5>
                <p className="card-text">
                    <span>Produto 1: R$ 30,00 <br /></span>
                    <span>Produto 2: R$ 40,00 <br /></span>
                    <span>Produto 3: R$ 45,00 <br /></span>
                </p>
                <h5 className="card-title">Serviços adquiridos:</h5>
                <p className="card-text">
                    <span>Serviço 1: R$ 35,00 <br /></span>
                    <span>Serviço 2: R$ 41,00 <br /></span>
                    <span>Serviço 3: R$ 43,00 <br /></span>
                </p>
                <button
                    className="btn btn-outline-primary"
                    type="submit"
                    onClick={this.openPopupConsumirProduto}
                >
                    Consumir um produto
                </button>
                <button
                    className="btn btn-outline-primary"
                    type="submit"
                    onClick={this.openPopupAdquirirServico}
                >
                    Adquirir um serviço
                </button>
                <button
                    className="btn btn-outline-info"
                    type="submit"
                    onClick={this.openPopupPet}
                >
                    Adicionar um novo pet
                </button>
                <button
                    className="btn btn-outline-info"
                    type="submit"
                    onClick={this.openPopupRG}
                >
                    Adicionar um novo RG
                </button>
                <button
                    className="btn btn-outline-info"
                    type="submit"
                    onClick={this.openPopupTelefone}
                >
                    Adicionar um novo telefone
                </button>
                <button
                    className="btn btn-outline-warning"
                    type="submit"
                    onClick={this.openPopup}
                >
                     Editar cliente
                </button>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                >
                    Excluir cliente
                </button>
                <button
                    className="btn btn-outline-warning"
                    type="button"
                    onClick={this.openPopupEditarPet}
                >
                    Editar pet
                </button>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={this.openPopupDeletarPet}
                >
                    Excluir pet
                </button>
                {this.state.isPopupOpenAdquirirServico && (
                    <div>
                        <div className="overlay" onClick={this.closePopupAdquirirServico}></div>
                        <PopupAdquirirServico onClose={this.closePopupAdquirirServico} />
                    </div>
                )}
                {this.state.isPopupOpenConsumirProduto && (
                    <div>
                        <div className="overlay" onClick={this.closePopupConsumirProduto}></div>
                        <PopupConsumirProduto onClose={this.closePopupConsumirProduto} />
                    </div>
                )}
                {this.state.isPopupOpen && (
                    <div>
                        <div className="overlay" onClick={this.closePopup}></div>
                        <Popup onClose={this.closePopup} />
                    </div>
                )}
                {this.state.isPopupOpenPet && (
                    <div>
                        <div className="overlay" onClick={this.closePopupPet}></div>
                        <PopupNewPet onClose={this.closePopupPet} />
                    </div>
                )}
                {this.state.isPopupOpenRG && (
                    <div>
                        <div className="overlay" onClick={this.closePopupRG}></div>
                        <PopupNewRG onClose={this.closePopupRG} />
                    </div>
                )}
                {this.state.isPopupOpenTelefone && (
                    <div>
                        <div className="overlay" onClick={this.closePopupTelefone}></div>
                        <PopupNewTelefone onClose={this.closePopupTelefone} />
                    </div>
                )}
                {this.state.isPopupOpenEditarPet && (
                    <div>
                        <div className="overlay" onClick={this.closePopupEditarPet}></div>
                        <PopupEditarPet onClose={this.closePopupEditarPet} />
                    </div>
                )}
                {this.state.isPopupOpenDeletarPet && (
                  <div>
                      <div className="overlay" onClick={this.closePopupDeletarPet}></div>
                      <PopupDeletarPet onClose={this.closePopupDeletarPet} />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
