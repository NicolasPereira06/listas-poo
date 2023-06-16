import { Component } from "react";

interface ProdutoData {
    nomeProduto: string;
    preco: string;
}

interface ServicoData {
    nomeServico: string;
    preco: string;
}

interface Consumidores {
    nome: string;
    totalConsumido: number;
  }

interface ProdutosMaisConsumidos {
    nomeProduto: string;
    quantidade: number;
}

interface ServicosMaisConsumidos {
    nomeServico: string;
    quantidade: number;
}

interface ClientesMaisConsumiramValor {
    nome: string;
    totalConsumidoValor: number;
}

interface ProdutoPet {
    tipo: string;
    raca: string;
    quantidade: number;
    produtos: string;
}

interface ServicoPet {
    tipo: string;
    raca: string;
    quantidade: number;
    servicos: string;
}

export default class Dashboard extends Component {
    state = {
        screenHeight: window.innerHeight,
        produtosConsumidos: [] as ProdutoData[],
        servicosConsumidos: [] as ServicoData[],
        clientesMaisConsumiram: [] as Consumidores[],
        produtosMaisConsumidos: [] as ProdutosMaisConsumidos[],
        servicosMaisConsumidos: [] as ServicosMaisConsumidos[],
        clientesMaisConsumiramValor: [] as ClientesMaisConsumiramValor[],
        produtosPorPet: [] as ProdutoPet[],
        servicosPorPet: [] as ServicoPet[],
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.fetchProdutosConsumidos();
        this.fetchServicosConsumidos();
        this.fetchClientesMaisConsumiram();
        this.fetchProdutosMaisConsumidos();
        this.fetchServicosMaisConsumidos();
        this.fetchClientesMaisConsumiramValor();
        this.fetchProdutosMaisConsumidosPorPet();
        this.fetchServicosMaisConsumidosPorPet();

    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ screenHeight: window.innerHeight });
    };

    fetchProdutosConsumidos = () => {
        fetch("http://localhost:3001/TodosProdutosConsumidos")
        .then((response) => response.json())
        .then((data) => {
        this.setState({ produtosConsumidos: data });
        })
        .catch((error) => {
        console.error("Error fetching produtos consumidos:", error);
        });
    };
    
    fetchServicosConsumidos = () => {
        fetch("http://localhost:3001/TodosServicosConsumidos")
        .then((response) => response.json())
        .then((data) => {
        this.setState({ servicosConsumidos: data });
        })
        .catch((error) => {
        console.error("Error fetching servicos consumidos:", error);
        });
    };

    fetchClientesMaisConsumiram = () => {
        fetch("http://localhost:3001/ClientesMaisConsumiram")
        .then((response) => response.json())
        .then((data) => {
        const clientesMaisConsumiram: { nome: string; totalConsumido: number }[] = data.map(
            (cliente: { nome: string; totalConsumido: number }) => ({
            nome: cliente.nome,
            totalConsumido: cliente.totalConsumido,
            })
        );
        this.setState({ clientesMaisConsumiram });
        })
        .catch((error) => {
        console.error("Error fetching clientes mais consumiram:", error);
        });
    };      

    fetchProdutosMaisConsumidos = () => {
        fetch("http://localhost:3001/ProdutosMaisConsumidos")
        .then((response) => response.json())
        .then((data) => {
        this.setState({ produtosMaisConsumidos: data });
        })
        .catch((error) => {
        console.error("Error fetching produtos mais consumidos:", error);
        });
    };

    fetchServicosMaisConsumidos = () => {
        fetch("http://localhost:3001/ServicosMaisConsumidos")
        .then((response) => response.json())
        .then((data) => {
        this.setState({ servicosMaisConsumidos: data });
        })
        .catch((error) => {
        console.error("Error fetching produtos mais consumidos:", error);
        });
    };

    fetchClientesMaisConsumiramValor = () => {
        fetch("http://localhost:3001/ClientesMaisConsumiramValor")
          .then((response) => response.json())
          .then((data) => {
            const clientesMaisConsumiramValor: { nome: string; totalConsumido: number }[] = data;
            this.setState({ clientesMaisConsumiramValor });
          })
          .catch((error) => {
            console.error("Error fetching clientes mais consumiram:", error);
          });
    };

    fetchProdutosMaisConsumidosPorPet = () => {
        fetch("http://localhost:3001/ProdutosMaisConsumidosPorPet")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ produtosPorPet: data });
          })
          .catch((error) => {
            console.error("Error fetching produtos mais consumidos por pet:", error);
          });
    };

    fetchServicosMaisConsumidosPorPet = () => {
        fetch("http://localhost:3001/ServicosMaisConsumidosPorPet")
          .then((response) => response.json())
          .then((data) => {
            this.setState({ servicosPorPet: data });
          })
          .catch((error) => {
            console.error("Error fetching serviços mais consumidos por pet:", error);
          });
    };
      

    render() {
        const { screenHeight, produtosConsumidos, servicosConsumidos, produtosMaisConsumidos, servicosMaisConsumidos, clientesMaisConsumiramValor, produtosPorPet, servicosPorPet} = this.state;
        const { clientesMaisConsumiram } = this.state;
        return(
            <div className="container-fluid overflow-auto" style={{ height: `${screenHeight}px` }}>
                <div className="row">
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Todos os produtos consumidos</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtosConsumidos.length > 0 && produtosConsumidos.some(produto => produto !== null) ? (
                                            produtosConsumidos
                                            .filter(produto => produto !== null) // Remove os valores nulos da matriz
                                            .filter((produto, index, self) => {
                                                // Filtra apenas os produtos únicos
                                                return (
                                                index ===
                                                self.findIndex(p => p?.nomeProduto === produto?.nomeProduto)
                                                );
                                            })
                                            .map((produto, index) => (
                                                <tr key={index}>
                                                    <td>{produto?.nomeProduto}</td>
                                                    <td>R$: {produto?.preco}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2}>Nenhum produto consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Todos os serviços adquiridos</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Serviço</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicosConsumidos.length > 0 && servicosConsumidos.some(servico => servico !== null) ? (
                                            servicosConsumidos
                                            .filter(servico => servico !== null) // Remove os valores nulos da matriz
                                            .filter((servico, index, self) => {
                                                // Filtra apenas os produtos únicos
                                                return (
                                                index ===
                                                self.findIndex(s => s?.nomeServico === servico?.nomeServico)
                                                );
                                            })
                                            .map((servico, index) => (
                                                <tr key={index}>
                                                    <td>{servico?.nomeServico}</td>
                                                    <td>R$: {servico?.preco}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2}>Nenhum serviço consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>10 Clientes que mais Consumiram em quantidade</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientesMaisConsumiram && clientesMaisConsumiram.length > 0 ? (
                                            clientesMaisConsumiram.map((cliente, index) => (
                                                <tr key={index}>
                                                    <td>{cliente.nome || "Nenhum cliente consumiu."}</td>
                                                    <td>{cliente.totalConsumido || "0"} itens consumidos.</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2}>Nenhum cliente encontrado.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Produtos mais consumidos</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtosMaisConsumidos &&
                                            produtosMaisConsumidos
                                            .filter((produto, index, self) => {
                                                // Filtra apenas os serviços únicos
                                                return (
                                                index ===
                                                self.findIndex(
                                                    (p) => p?.nomeProduto === produto?.nomeProduto
                                                )
                                                );
                                            })
                                            .map((produto, index) => (
                                                <tr key={index}>
                                                    <td>{produto?.nomeProduto || "Nenhum produto consumido."}</td>
                                                    <td>{produto?.quantidade || "0"}</td>
                                                </tr>
                                            ))}
                                        {(!produtosMaisConsumidos || produtosMaisConsumidos.length === 0) && (
                                            <tr>
                                             <td colSpan={2}>Nenhum produto consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Serviços mais adquiridos</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Serviço</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicosMaisConsumidos &&
                                            servicosMaisConsumidos
                                            .filter((servico, index, self) => {
                                                // Filtra apenas os serviços únicos
                                                return (
                                                index ===
                                                self.findIndex(
                                                    (s) => s?.nomeServico === servico?.nomeServico
                                                )
                                                );
                                            })
                                            .map((servico, index) => (
                                                <tr key={index}>
                                                    <td>{servico?.nomeServico || "Nenhum serviço consumido."}</td>
                                                    <td>{servico?.quantidade || "0"}</td>
                                                </tr>
                                            ))}
                                        {(!servicosMaisConsumidos || servicosMaisConsumidos.length === 0) && (
                                            <tr>
                                             <td colSpan={2}>Nenhum serviço consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Produtos mais consumidos por tipo e raça de pets</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Tipo do pet</th>
                                            <th>Raça do pet</th>
                                            <th>Quantidade</th>
                                            <th>Produtos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtosPorPet.length > 0 ? (
                                            produtosPorPet.map((pet, index) => (
                                            <tr key={index}>
                                                <td>{pet?.tipo}</td>
                                                <td>{pet?.raca}</td>
                                                <td>{pet?.quantidade}</td>
                                                <td>{pet?.produtos}</td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhum produto consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card" style={{marginBottom: '100px'}}>
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>Serviços mais adquiridos por tipo e raça de pets</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Tipo do pet</th>
                                            <th>Raça do pet</th>
                                            <th>Quantidade</th>
                                            <th>Serviço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicosPorPet.length > 0 ? (
                                            servicosPorPet.map((pet, index) => (
                                            <tr key={index}>
                                                <td>{pet?.tipo}</td>
                                                <td>{pet?.raca}</td>
                                                <td>{pet?.quantidade}</td>
                                                <td>{pet?.servicos}</td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhum serviço consumido.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div className="card" style={{marginBottom: '100px'}}>
                            <div className="card-body">
                                <table className="table">
                                    <caption><b>5 Clientes que mais consumiram em valor</b></caption>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Valor total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientesMaisConsumiramValor && clientesMaisConsumiramValor.length > 0 ? (
                                            clientesMaisConsumiramValor.map((cliente, index) => (
                                                <tr key={index}>
                                                    <td>{cliente.nome || "Nenhum cliente consumiu."}</td>
                                                    <td>R$: {cliente.totalConsumidoValor || "0"} </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2}>Nenhum cliente encontrado.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}