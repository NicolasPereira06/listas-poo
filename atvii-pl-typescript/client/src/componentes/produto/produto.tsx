import { Component } from "react";
import PopupEditProduto from "./popupEditProduto";
import "../styles/definitionPopup.css"
import PopupCadastroProduto from "./popupCadastroProduto";

export default class Produto extends Component {

    state = {
        produtoSelecionado: null,
        isOpenPopupEditProduto: false,
        isOpenPopupCadastroProduto: false
    }

    handleProductClick = (produto: string) => {
        if (this.state.produtoSelecionado === produto) {
          this.setState({ produtoSelecionado: null });
        } else {
          this.setState({ produtoSelecionado: produto });
        }
    };
    
    openPopupEditProduto = () => {
        this.setState({ isOpenPopupEditProduto: true });
    };
    
    closePopupEditProduto = () => {
        this.setState({ isOpenPopupEditProduto: false });
    };

    openPopupCadastroProduto = () => {
        this.setState({ isOpenPopupCadastroProduto: true });
    };
    
    closePopupCadastroProduto = () => {
        this.setState({ isOpenPopupCadastroProduto: false });
    };

    render() {
        const produtos = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5']
        return (
            <div className="container-fluid overflow-auto" style={{ height: '900px'}}>
                <button
                    className="btn btn-outline-primary mb-2 ml-5"
                    type="button"
                    onClick={this.openPopupCadastroProduto}
                >
                    Cadastrar produto
                </button>
                {this.state.isOpenPopupCadastroProduto && (
                    <div>
                        <div className="overlay" onClick={this.closePopupCadastroProduto}></div>
                        <PopupCadastroProduto onClose={this.closePopupCadastroProduto} />
                    </div>
                )}
                <div className="list-group">
                    {produtos.map((produto, index) => (
                        <a
                            key={index}
                            href="#"
                            className="list-group-item list-group-item-action"
                            onClick={() => this.handleProductClick(produto)}
                        >
                            {produto}
                        </a>
                    ))}
                </div>
                {this.state.produtoSelecionado && (
                    <div className="card mt-3" style={{marginBottom: '100px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.produtoSelecionado}</h5>
                            <p className="card-text">
                                <span>Preço: R$ 50,00 <br /></span>
                            </p>
                            <button
                                className="btn btn-outline-warning"
                                type="submit"
                                onClick={this.openPopupEditProduto}
                            >
                                Editar produto
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                type="button"
                            >
                                Excluir produto
                            </button>
                            {this.state.isOpenPopupEditProduto && (
                                <div>
                                    <div className="overlay" onClick={this.closePopupEditProduto}></div>
                                    <PopupEditProduto onClose={this.closePopupEditProduto} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}