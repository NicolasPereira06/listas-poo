import { Component } from "react";
import PopupEditProduto from "./popupEditProduto";
import "../styles/definitionPopup.css"
import PopupCadastroProduto from "./popupCadastroProduto";
import Swal from "sweetalert2";
import { UUID } from "crypto";

interface ProdutoData {
  ProdutoID: UUID;
  nomeProduto: string;
  preco: string;
}

export default class Produto extends Component {

    state = {
        isOpenPopupEditProduto: false,
        isOpenPopupCadastroProduto: false,
        produtos: [] as ProdutoData[],
        produtoSelecionado: null as ProdutoData | null,

    }

    componentDidMount() {
        this.fetchProdutos();
    }

    handleProductClick = (produto: ProdutoData) => {
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

    msgSucessoPost = () => {
        Swal.fire({
          title: "Sucesso",
          html: "Exclusão realizada com sucesso.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: '#de940a',
          customClass: {
            container: 'swal-container',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }

    fetchProdutos = () => {
        fetch('http://localhost:3001/ListarProdutos')
        .then((response) => response.json())
        .then((data) => this.setState({ produtos: data }))
        .catch((error) => console.error('Erro ao obter dados dos produtos:', error));
    };

    handleProdutoClick = (produto: ProdutoData) => {
        if (this.state.produtoSelecionado === produto) {
          this.setState({ produtoSelecionado: null });
        } else {
          this.setState({ produtoSelecionado: produto });
        }
    };


    handleDeleteCliente = () => {
      const { produtoSelecionado } = this.state;
      if (produtoSelecionado) {
        const produtoID = produtoSelecionado.ProdutoID;

        console.log(produtoID)
    
        // Exibe o pop-up de confirmação de exclusão
        Swal.fire({
          title: 'Confirmação',
          text: 'Tem certeza que deseja excluir este produto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Cancelar',
          customClass: {
            container: 'swal-container'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            // Se o usuário confirmar a exclusão, envia a solicitação DELETE
            fetch(`http://localhost:3001/ExcluirProduto/${produtoID}`, {
              method: 'DELETE'
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.message); // Exibe a mensagem de sucesso
              })
              .catch((error) =>
                console.error('Erro ao excluir o produto:', error)
              );
          } 
          this.msgSucessoPost()
        });
      }
    };
    
    render() {
        const { produtos, produtoSelecionado } = this.state;
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
                            {produto.nomeProduto}
                        </a>
                    ))}
                </div>
                {produtoSelecionado && (
                    <div className="card mt-3" style={{marginBottom: '100px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{produtoSelecionado.nomeProduto}</h5>
                            <p className="card-text">
                                <span>Preço: R$ {produtoSelecionado.preco}</span>
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
                                onClick={this.handleDeleteCliente}
                            >
                                Excluir produto
                            </button>
                            {this.state.isOpenPopupEditProduto && this.state.produtoSelecionado && (
                                <div>
                                    <div className="overlay" onClick={this.closePopupEditProduto}></div>
                                    <PopupEditProduto onClose={this.closePopupEditProduto} produto={this.state.produtoSelecionado} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}