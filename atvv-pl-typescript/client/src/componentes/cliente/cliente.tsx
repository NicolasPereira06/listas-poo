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
import Swal from "sweetalert2";
import { UUID } from 'crypto';

interface ClienteData {
  id: UUID;
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataEmissaoCPF: string;
  rg: { numero: string; dataEmissao: string }[];
  rgFormatado: string;
  telefone: {ddd: string; numero: string}[];
  pets: { nome: string; tipo: string; raca: string; genero: string }[];
  produtosConsumidos: {nomeProduto: string; preco: string;}[];
  servicosConsumidos: {nomeServico: string; preco: string}[];
}

export default class Cliente extends Component {
  state = {
    isPopupOpen: false,
    isPopupOpenCadastro: false,
    isPopupOpenPet: false,
    isPopupOpenRG: false,
    isPopupOpenTelefone: false,
    isPopupOpenConsumirProduto: false,
    isPopupOpenAdquirirServico: false,
    clienteSelecionado: null as ClienteData | null,
    screenHeight: window.innerHeight,
    isPopupOpenEditarPet: false,
    isPopupOpenDeletarPet: false,
    clientes: [] as ClienteData[]
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
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.fetchClientes();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenHeight: window.innerHeight });
  };

  formatarRGS(rg: string[]): string {
    return rg.join(", ");
  }

  handleClientClick = (cliente: ClienteData) => {
    if (this.state.clienteSelecionado === cliente) {
      this.setState({ clienteSelecionado: null });
    } else {
      this.setState({ clienteSelecionado: cliente });
    }
  };

  handleDeleteCliente = () => {
    const { clienteSelecionado } = this.state;
    if (clienteSelecionado) {
      const id = clienteSelecionado.id;
  
      // Exibir mensagem de confirmação antes de excluir o cliente
      Swal.fire({
        title: "Confirmação",
        text: "Tem certeza de que deseja excluir o cliente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#de940a",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        customClass: {
          container: 'swal-container',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Faz uma solicitação DELETE para excluir o cliente com base no CPF
          fetch(`http://localhost:3001/ExcluirCliente/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message); // Exibe a mensagem de sucesso
              this.msgSucessoPost()
            })
            .catch((error) => console.error("Erro ao excluir o cliente:", error));
        }
      });
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
  
  fetchClientes = () => {
    fetch('http://localhost:3001/ListarClientes')
      .then((response) => response.json())
      .then((data) => {
        const clientesFormatados = data.map((cliente: ClienteData) => {
          const rgFormatado = cliente.rg.map((rg) => rg.numero).join(", ");
          return { ...cliente, rgFormatado };
        });
        this.setState({ clientes: clientesFormatados });
      })
      .catch((error) => console.error('Erro ao obter dados dos clientes:', error));
  };


  render() {
    const { clientes, clienteSelecionado } = this.state;
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
              {cliente.nome}
            </a>
          ))}
        </div>

        {clienteSelecionado && (
          <div className="card mt-3" style={{marginBottom: '100px'}}>
            <div className="card-body">
                <h5 className="card-title">{clienteSelecionado.nome}</h5>
                <p className="card-text">
                    <span>Nome social: {clienteSelecionado.nomeSocial} <br /></span>
                </p>
                <h5 className="card-title">Documentos:</h5>
                <p className="card-text">
                  <span>CPF: {clienteSelecionado.cpf} <br /></span>
                  <span>RGs: {clienteSelecionado.rgFormatado}</span>
                </p>
                <h5 className="card-title">Contato:</h5>
                <p className="card-text">
                  <span>Telefones:</span>{" "}
                  {clienteSelecionado.telefone.map((tel, index) => (
                    <span key={index}>
                      {`(${tel.ddd}) ${tel.numero}`}
                      {index !== clienteSelecionado.telefone.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <h5 className="card-title">Pets:</h5>
                <p className="card-text">
                  {clienteSelecionado.pets.map((pet, index) => (
                    <div key={index}>
                      <span>Nome do pet: {pet.nome} <br /></span>
                      <span>Tipo do pet: {pet.tipo} <br /></span>
                      <span>Raça do pet: {pet.raca} <br /></span>
                      <span>Gênero do pet: {pet.genero} <br /></span>
                      <span>-------------------------------------------</span>
                      <br></br>
                    </div>
                  ))}
                </p>
                <h5 className="card-title">Produtos consumidos:</h5>
                <p className="card-text">
                  {clienteSelecionado.produtosConsumidos &&
                    clienteSelecionado.produtosConsumidos
                    .filter((produto, index, self) => {
                      // Filtra apenas os serviços únicos
                      return (
                        index ===
                        self.findIndex(
                          (p) => p.nomeProduto === produto.nomeProduto && p.preco === produto.preco
                        )
                      );
                    })
                    .map((produto, index) => (
                      <div key={index}>
                        <span>{produto.nomeProduto}: R$ {produto.preco}</span>
                      </div>
                    ))}
                </p>
                <h5 className="card-title">Serviços adquiridos:</h5>
                <p className="card-text">
                  {clienteSelecionado.servicosConsumidos &&
                    clienteSelecionado.servicosConsumidos
                    .filter((servico, index, self) => {
                      // Filtra apenas os serviços únicos
                      return (
                        index ===
                        self.findIndex(
                          (s) => s.nomeServico === servico.nomeServico && s.preco === servico.preco
                        )
                      );
                    })
                    .map((servico, index) => (
                      <div key={index}>
                        <span>{servico.nomeServico}: R$ {servico.preco}</span>
                      </div>
                    ))}
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
                    onClick={this.handleDeleteCliente}
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
                {this.state.isPopupOpen && this.state.clienteSelecionado && (
                  <div>
                    <div className="overlay" onClick={this.closePopup}></div>
                    <Popup onClose={this.closePopup} cliente={this.state.clienteSelecionado}/>
                  </div>
                )}
                {this.state.isPopupOpenPet && (
                  <div>
                    <div className="overlay" onClick={this.closePopupPet}></div>
                    <PopupNewPet
                      onClose={this.closePopupPet}
                      cpfCliente={this.state.clienteSelecionado?.cpf}
                    />
                  </div>
                )}
                {this.state.isPopupOpenRG && (
                    <div>
                        <div className="overlay" onClick={this.closePopupRG}></div>
                        <PopupNewRG onClose={this.closePopupRG} cpfCliente={this.state.clienteSelecionado?.cpf} />
                    </div>
                )}
                {this.state.isPopupOpenTelefone && (
                    <div>
                        <div className="overlay" onClick={this.closePopupTelefone}></div>
                        <PopupNewTelefone onClose={this.closePopupTelefone} cpfCliente={this.state.clienteSelecionado?.cpf} />
                    </div>
                )}
                {this.state.isPopupOpenEditarPet && (
                    <div>
                        <div className="overlay" onClick={this.closePopupEditarPet}></div>
                        <PopupEditarPet onClose={this.closePopupEditarPet} cpfCliente={this.state.clienteSelecionado?.cpf} />
                    </div>
                )}
                {this.state.isPopupOpenDeletarPet && (
                  <div>
                    <div className="overlay" onClick={this.closePopupDeletarPet}></div>
                    <PopupDeletarPet onClose={this.closePopupDeletarPet} cpfCliente={this.state.clienteSelecionado?.cpf} />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
