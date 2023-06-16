import { Component } from "react";
import "../styles/definitionPopup.css"
import PopupCadastroServico from "./popupCadastroServico";
import PopupEditServico from "./popupEditServico";
import Swal from "sweetalert2";
import { UUID } from "crypto";

interface ServicoData {
    ServicoID: UUID;
    nomeServico: string;
    preco: string;
}

export default class Servico extends Component {

    state = {
        isOpenPopupEditServico: false,
        isOpenPopupCadastroServico: false,
        servicos: [] as ServicoData[],
        servicoSelecionado: null as ServicoData | null,
    }

    componentDidMount() {
        this.fetchServicos();
    }

    handleServiceClick = (servico: ServicoData) => {
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

    fetchServicos = () => {
        fetch('http://localhost:3001/ListarServicos')
        .then((response) => response.json())
        .then((data) => this.setState({ servicos: data }))
        .catch((error) => console.error('Erro ao obter dados dos serviços:', error));
    };

    handleServicoClick = (servico: ServicoData) => {
        if (this.state.servicoSelecionado === servico) {
          this.setState({ servicoSelecionado: null });
        } else {
          this.setState({ servicoSelecionado: servico });
        }
    };

    handleDeleteServico = () => {
      const { servicoSelecionado } = this.state;
      if (servicoSelecionado) {
        const servicoID = servicoSelecionado.ServicoID;

        console.log(servicoID)
    
        // Exibe o pop-up de confirmação de exclusão
        Swal.fire({
          title: 'Confirmação',
          text: 'Tem certeza que deseja excluir este serviço?',
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
            fetch(`http://localhost:3001/ExcluirServico/${servicoID}`, {
              method: 'DELETE'
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.message); // Exibe a mensagem de sucesso
                this.msgSucessoPost()
              })
              .catch((error) =>
                console.error('Erro ao excluir o serviço:', error)
              );
          }
        });
      }
    };
    

    render() {
        const {servicos, servicoSelecionado} = this.state;

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
                            {servico.nomeServico}
                        </a>
                    ))}
                </div>
                {servicoSelecionado && (
                    <div className="card mt-3" style={{marginBottom: '100px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{servicoSelecionado.nomeServico}</h5>
                            <p className="card-text">
                                <span>Preço: R$ {servicoSelecionado.preco} <br /></span>
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
                                onClick={this.handleDeleteServico}
                            >
                                Excluir serviço
                            </button>
                            {this.state.isOpenPopupEditServico && this.state.servicoSelecionado && (
                                <div>
                                    <div className="overlay" onClick={this.closePopupEditServico}></div>
                                    <PopupEditServico onClose={this.closePopupEditServico} servico={this.state.servicoSelecionado} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}