import { Component } from "react";
import "../styles/definitionPopup.css"
import PopupCadastroServico from "./popupCadastroServico";
import PopupEditServico from "./popupEditServico";

export default class Servico extends Component {

    state = {
        servicoSelecionado: null,
        isOpenPopupEditServico: false,
        isOpenPopupCadastroServico: false
    }

    handleServiceClick = (servico: string) => {
        if (this.state.servicoSelecionado === servico) {
          this.setState({ servicoSelecionado: null });
        } else {
          this.setState({ servicoSelecionado: servico });
        }
    };

    openPopupEditServico = () => {
        this.setState({ isOpenPopupEditServico: true });
    };
    
    closePopupEditServico = () => {
        this.setState({ isOpenPopupEditServico: false });
    };

    openPopupCadastroServico = () => {
        this.setState({ isOpenPopupCadastroServico: true });
    };
    
    closePopupCadastroServico = () => {
        this.setState({ isOpenPopupCadastroServico: false });
    };

    render() {
        const servicos = ['Serviço 1', 'Serviço 2', 'Serviço 3', 'Serviço 4', 'Serviço 5']
        return (
            <div className="container-fluid overflow-auto" style={{ height: '900px'}}>
                <button
                    className="btn btn-outline-primary mb-2 ml-5"
                    type="button"
                    onClick={this.openPopupCadastroServico}
                >
                    Cadastrar serviço
                </button>
                {this.state.isOpenPopupCadastroServico && (
                    <div>
                        <div className="overlay" onClick={this.closePopupCadastroServico}></div>
                        <PopupCadastroServico onClose={this.closePopupCadastroServico} />
                    </div>
                )}
                <div className="list-group">
                    {servicos.map((servico, index) => (
                        <a
                            key={index}
                            href="#"
                            className="list-group-item list-group-item-action"
                            onClick={() => this.handleServiceClick(servico)}
                        >
                            {servico}
                        </a>
                    ))}
                </div>
                {this.state.servicoSelecionado && (
                    <div className="card mt-3" style={{marginBottom: '100px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.servicoSelecionado}</h5>
                            <p className="card-text">
                                <span>Preço: R$ 30,00 <br /></span>
                            </p>
                            <button
                                className="btn btn-outline-warning"
                                type="submit"
                                onClick={this.openPopupEditServico}
                            >
                                Editar serviço
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                type="button"
                            >
                                Excluir serviço
                            </button>
                            {this.state.isOpenPopupEditServico && (
                                <div>
                                    <div className="overlay" onClick={this.closePopupEditServico}></div>
                                    <PopupEditServico onClose={this.closePopupEditServico} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}