import { Component } from "react";
import "../styles/popup.css"
import Swal from "sweetalert2";
import { UUID } from "crypto";

interface PopupProps {
  onClose: () => void;
  servico: ServicoData,
}

interface ServicoData {
  ServicoID: UUID;
  nomeServico: string;
  preco: string;
}

interface PopupStateServico {
  ServicoID: UUID;
  nomeServico: string;
  preco: string;
}

export default class PopupEditProduto extends Component<PopupProps, PopupStateServico> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      ServicoID: props.servico.ServicoID,
      nomeServico: props.servico.nomeServico,
      preco: props.servico.preco,
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

  handleEditarServico = () => {
    const { nomeServico, preco, ServicoID } = this.state;
    const { servico } = this.props;


    if (!nomeServico || !preco) {
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
    fetch(`http://localhost:3001/EditarServico/${servico.ServicoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nomeServico, preco, ServicoID }),
    })
    .then((response) => {
      if (response.ok) {
        this.msgSucessoPost();
        console.log("Serviço editado:", response.json());
      } else if (response.status === 400) {
        Swal.fire({
          title: 'Erro',
          text: 'Já existe um serviço cadastrado com esse nome.',
          icon: 'error',
          allowOutsideClick: false,
          customClass: {
            container: 'swal-container'
          }
        });
      } else {
        console.error("Erro ao editar produto:", response.json());
      }
    })
  };

  handleInputChangeServiço= (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<PopupStateServico, keyof PopupStateServico>);
  };

  render() {
    const { onClose } = this.props;
    const { nomeServico, preco } = this.state;

    return (
      <div className="popup">
        <style>{`.swal-container {z-index: 999999 !important;}`}</style>
        <h2>Editar serviço</h2>
        <form>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="nomeServico"
                    className="form-control"
                    placeholder="Nome"
                    value={nomeServico}
                    onChange={this.handleInputChangeServiço}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="preco"
                    className="form-control"
                    placeholder="Preço (Digite só o número)"
                    value={preco}
                    onChange={this.handleInputChangeServiço}
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
                onClick={this.handleEditarServico}
            >
                Editar produto
            </button>
        </form>
      </div>
    );
  }
}