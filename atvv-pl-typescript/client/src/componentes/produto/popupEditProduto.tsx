import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";
import { UUID } from "crypto";

interface PopupProps {
  onClose: () => void;
  produto: ProdutoData,
}

interface ProdutoData {
  ProdutoID: UUID;
  nomeProduto: string;
  preco: string;
}

interface PopupStateProduto {
  ProdutoID: UUID;
  nomeProduto: string;
  preco: string;
}

export default class PopupEditProduto extends Component<PopupProps, PopupStateProduto> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      ProdutoID: props.produto.ProdutoID,
      nomeProduto: props.produto.nomeProduto,
      preco: props.produto.preco,
    };
  }

  msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Informações salvas com sucesso.",
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

  handleEditarProduto = () => {
    const { ProdutoID, nomeProduto, preco } = this.state;
    const { produto } = this.props;
  
    if (!nomeProduto || !preco) {
      Swal.fire({
        title: 'Erro',
        text: 'Preencha todos os campos!',
        icon: 'error',
        customClass: {
          container: 'swal-container'
        }
      });
      return;
    }
  
    // Enviar os dados atualizados para o servidor
    fetch(`http://localhost:3001/EditarProduto/${produto.ProdutoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nomeProduto, preco }),
    })
      .then((response) => {
        if (response.ok) {
          this.msgSucessoPost();
          console.log("Produto editado:", response.json());
        } else if (response.status === 400) {
          response.json().then((errorMessage) => {
            Swal.fire({
              title: 'Erro',
              text: errorMessage.error,
              icon: 'error',
              allowOutsideClick: false,
              customClass: {
                container: 'swal-container'
              }
            });
          });
        } else {
          console.error("Erro ao editar produto:", response.json());
        }
      })
      .catch((error) => {
        console.error("Erro ao editar produto:", error);
      });
  };
  
  

  handleInputChangeProduto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupStateProduto, keyof PopupStateProduto>);
  };

  render() {
    const { onClose } = this.props;
    const { nomeProduto, preco } = this.state;

    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Editar produto</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nomeProduto"
                    className="form-control"
                    placeholder="Nome"
                    value={nomeProduto}
                    onChange={this.handleInputChangeProduto}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="preco"
                    className="form-control"
                    placeholder="Preço (Digite só o número)"
                    value={preco}
                    onChange={this.handleInputChangeProduto}
                />
            </div>
            <button
                className="btn btn-outline-danger"
                type="button"
                onClick={onClose}
            >
                Fechar
            </button>
            <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.handleEditarProduto}
            >
                Editar produto
            </button>
        </form>
      </div>
    );
  }
}