import { Component, SyntheticEvent } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";

interface PopupProps {
  onClose: () => void;
}

interface ProdutoData {
  nomeProduto: string;
  preco: string;
}

export default class PopupCadastroProduto extends Component<PopupProps> {

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

  cadastrarProduto = async (event: SyntheticEvent) => {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
  
    const nomeProduto = formData.get('nome') as string;
    const preco = formData.get('preco') as string;
  
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
  
    const produtoData: ProdutoData = {
      nomeProduto,
      preco,
    };
  
    try {
      const response = await fetch('http://localhost:3001/CadastroProdutos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
      });
  
      if (response.ok) {
        this.msgSucessoPost();
      } else if (response.status === 400) {
        const errorMessage = await response.json();
        Swal.fire({
          title: 'Erro',
          text: errorMessage.error,
          icon: 'error',
          customClass: {
            container: 'swal-container'
          }
        });
      } else {
        console.error('Erro ao cadastrar o produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
    }
  };
  
  render() {
    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Cadastrar produto</h2>
        <form onSubmit={this.cadastrarProduto}>
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
                    placeholder="Preço (Digite só o número)"
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
                type="submit"
            >
                Cadastrar produto
            </button>
        </form>
      </div>
    );
  }
}