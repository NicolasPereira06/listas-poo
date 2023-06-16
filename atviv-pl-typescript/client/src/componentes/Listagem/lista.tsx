import { Component } from "react";
import  Modal  from "../Editor/modal"
import "../Editor/styles.css";
import Swal from "sweetalert2";

type Props = {
  tema: string;
};

type State = {
  clientes: any[];
  clienteSelecionado: any | null;
  exibirPopUp: boolean;
  clienteOriginal: any | null;
};

export default class Lista extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clientes: [],
      clienteSelecionado: null,
      exibirPopUp: false,
      clienteOriginal: null,
    };
  }

  msgSucessoEdit = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Informações salvas com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  msgSucessoDelete = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Cliente excluído com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isEnderecoField = name.startsWith('endereco.');
    const isTelefoneField = name.startsWith('telefones.');
  
    this.setState(prevState => {
      let clienteSelecionado = { ...prevState.clienteSelecionado };
  
      if (isEnderecoField) {
        clienteSelecionado = {
          ...clienteSelecionado,
          endereco: {
            ...clienteSelecionado.endereco,
            [name.replace('endereco.', '')]: value,
          },
        };
      } else if (isTelefoneField) {
        const telefoneIndex = parseInt(name.split('.')[1]);
  
        clienteSelecionado = {
          ...clienteSelecionado,
          telefones: clienteSelecionado.telefones.map((telefone: any, index: any) =>
            index === telefoneIndex
              ? { ...telefone, [name.split('.')[2]]: value }
              : telefone
          ),
        };
      } else {
        clienteSelecionado = {
          ...clienteSelecionado,
          [name]: value,
        };
      }
  
      return { clienteSelecionado };
    });
  };
  

  handleInputChangeOthers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    this.setState(prevState => {
      const clienteSelecionadoAtualizado = {
        ...prevState.clienteSelecionado,
        endereco: {
          ...prevState.clienteSelecionado?.endereco,
          [name]: value
        }
      };
  
      return {
        clienteSelecionado: clienteSelecionadoAtualizado
      };
    });
  };

  handleInputChangeTelefone = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const { value } = event.target;
    const telefonesAtualizados = [...this.state.clienteSelecionado.telefones];
    telefonesAtualizados[index][field] = value;
  
    this.setState(prevState => ({
      clienteSelecionado: {
        ...prevState.clienteSelecionado,
        telefones: telefonesAtualizados,
      },
    }));
  };
  
  handleClickBotao = (cliente: any) => {
    const { clienteSelecionado } = this.state;
    this.setState({ 
      exibirPopUp: true,
      clienteOriginal: { ...clienteSelecionado }
    });
  };
  

  handleClosePopUp = () => {
    const { clienteOriginal } = this.state;
    this.setState({ 
      exibirPopUp: false,
      clienteSelecionado: clienteOriginal // Restaura o valor original
    });
  };
  
  componentDidMount() {
    this.pegarListar();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.clienteSelecionado !== this.state.clienteSelecionado) {
      this.pegarListar();
    }
  }
  

  pegarListar() {
    fetch("http://localhost:32831/cliente/clientes", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        this.setState({
          clientes: data
        });
      });
  }
  
  atualizarCliente = (event: React.FormEvent) => {
    event.preventDefault();
    const { clienteSelecionado } = this.state;
  
    Swal.fire({
      title: 'Confirmação de Edição',
      text: 'Tem certeza que deseja atualizar o cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:32831/cliente/atualizar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteSelecionado),
        })
          .then((response) => response.json())
          .then((data) => {
          })
          .catch((error) => {
            console.error(error);
          });
        this.handleClosePopUp();
        this.msgSucessoEdit()
      }
    });
  };
  
  
  excluirCliente = () => {
    const { clienteSelecionado } = this.state;
  
    Swal.fire({
      title: 'Confirmação de Exclusão',
      text: 'Tem certeza que deseja excluir o cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:32831/cliente/excluir`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteSelecionado),
        })
          .then(response => {
            if (response.ok) {
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log(error);
          });
          this.msgSucessoDelete()
      }
    });
  };

  render() {
    const { tema } = this.props;
    const { clientes, clienteSelecionado, exibirPopUp} = this.state;
    return (
      <div className="container-fluid">
        <div className="input-group mb-3">
            <h3>Lista dos clientes:</h3>
        </div>
        <div className="list-group">
          {clientes.map((cliente, index) => (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              key={index}
              onClick={() => this.setState({ clienteSelecionado: cliente })}
            >
              {cliente.nome}
            </a>
          ))}
        </div>
        {clienteSelecionado && (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{clienteSelecionado.nome}</h5>
              <p className="card-text">
                {clienteSelecionado.nomeSocial && (
                  <span>Nome social: {clienteSelecionado.nomeSocial}<br /></span>
                )}
                {clienteSelecionado.email && (
                  <span>Email: {clienteSelecionado.email}<br /></span>
                )}
                {clienteSelecionado.telefones.map((i: { ddd: string; numero: string}) => {
                  return (
                    <>
                      <span key={i.ddd + i.numero}>Telefone: ({i.ddd}) {i.numero}</span><br />
                    </>
                  )
                })}
              </p>
              <h5 className="card-title">Endereço: </h5>
              <p className="card-text">
                {clienteSelecionado.endereco.estado && (
                  <span>Estado: {clienteSelecionado.endereco.estado}<br /></span>
                )}
                {clienteSelecionado.endereco.cidade && (
                  <span>Cidade: {clienteSelecionado.endereco.cidade}<br /></span>
                )}
                {clienteSelecionado.endereco.bairro && (
                  <span>Bairro: {clienteSelecionado.endereco.bairro}<br /></span>
                )}
                {clienteSelecionado.endereco.rua && (
                  <span>Rua: {clienteSelecionado.endereco.rua}<br /></span>
                )}
                {clienteSelecionado.endereco.numero && (
                  <span>Número: {clienteSelecionado.endereco.numero}<br /></span>
                )}
                {clienteSelecionado.endereco.codigoPostal && (
                  <span>Código Postal: {clienteSelecionado.endereco.codigoPostal}<br /></span>
                )}
              </p>
              <h5 className="card-title">Informações adicionais: </h5>
              <p className="card-text">
                {clienteSelecionado.endereco.informacoesAdicionais && (
                  <span>Informações Adicionais: {clienteSelecionado.endereco.informacoesAdicionais}<br /></span>
                )}
              </p>
              <button
                className="btn btn-outline-secondary"
                type="submit"
                style={{ background: tema }}
                onClick={this.handleClickBotao}
              >
                Editar cliente
              </button>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={this.excluirCliente}
              >
                Excluir cliente
              </button>

              {this.state.exibirPopUp && (
                <Modal onClose={this.handleClosePopUp}>
                  <h2>Editar cliente</h2>
                  <form>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="nome"
                        value={clienteSelecionado?.nome || ""}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Nome"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="nomeSocial"
                        value={clienteSelecionado?.nomeSocial || ""}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Nome social"
                        aria-label="Nome social"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        name="email"
                        value={clienteSelecionado?.email || ""}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {clienteSelecionado.telefones.map((telefone: { ddd: string; numero: string }, index: number) => (
                      <div key={index}>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            name={`telefones[${index}].ddd`}
                            value={telefone.ddd || ""}
                            onChange={event => this.handleInputChangeTelefone(event, index, 'ddd')}
                            className="form-control"
                            placeholder="DDD"
                            aria-label="DDD"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            name={`telefones[${index}].numero`}
                            value={telefone.numero || ""}
                            onChange={event => this.handleInputChangeTelefone(event, index, 'numero')}
                            className="form-control"
                            placeholder="Número de Telefone"
                            aria-label="Número de Telefone"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="endereco.estado"
                        value={clienteSelecionado?.endereco.estado || ""}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Estado"
                        aria-label="Estado"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="cidade"
                        value={clienteSelecionado?.endereco.cidade || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Cidade"
                        aria-label="Cidade"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="bairro"
                        value={clienteSelecionado?.endereco.bairro || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Bairro"
                        aria-label="Bairro"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="rua"
                        value={clienteSelecionado?.endereco.rua || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Rua"
                        aria-label="Rua"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="numero"
                        value={clienteSelecionado?.endereco.numero || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Número"
                        aria-label="Número"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="codigoPostal"
                        value={clienteSelecionado?.endereco.codigoPostal || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Código Postal"
                        aria-label="CodigoPostal"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="informacoesAdicionais"
                        value={clienteSelecionado?.endereco.informacoesAdicionais || ""}
                        onChange={this.handleInputChangeOthers}
                        className="form-control"
                        placeholder="Informações adicionais"
                        aria-label="InformaçõesAdicionais"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <button
                      className="btn btn-outline-warning ml-4"
                      type="button"
                      onClick={this.handleClosePopUp}
                    >
                      Fechar
                    </button>
                    <button className="btn btn-outline-primary" type="submit" onClick={this.atualizarCliente}>Editar</button>
                  </form>
                </Modal>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}