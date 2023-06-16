import { Component } from "react";

export default class Dashboard extends Component {
    state = {
        screenHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ screenHeight: window.innerHeight });
    };

    render() {
        const { screenHeight } = this.state;
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
                                        <tr>
                                            <td>Produto 1</td>
                                            <td>R$: 30,00</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 2</td>
                                            <td>R$: 32,00</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 3</td>
                                            <td>R$: 34,00</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 4</td>
                                            <td>R$: 36,00</td>
                                        </tr>
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
                                        <tr>
                                            <td>Serviço 1</td>
                                            <td>R$: 31,00</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 2</td>
                                            <td>R$: 34,00</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 3</td>
                                            <td>R$: 36,00</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 4</td>
                                            <td>R$: 38,00</td>
                                        </tr>
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
                                        <tr>
                                            <td>Cliente 1</td>
                                            <td>10 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 2</td>
                                            <td>7 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 3</td>
                                            <td>3 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 4</td>
                                            <td>2 itens consumidos.</td>
                                        </tr>
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
                                        <tr>
                                            <td>Produto 1</td>
                                            <td>7 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 2</td>
                                            <td>5 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 3</td>
                                            <td>3 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Produto 4</td>
                                            <td>2 itens consumidos.</td>
                                        </tr>
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
                                        <tr>
                                            <td>Serviço 1</td>
                                            <td>11 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 2</td>
                                            <td>8 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 3</td>
                                            <td>5 itens consumidos.</td>
                                        </tr>
                                        <tr>
                                            <td>Serviço 4</td>
                                            <td>3s itens consumidos.</td>
                                        </tr>
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
                                            <th>Produto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Pitbull</td>
                                            <td>7 itens consumidos.</td>
                                            <td>Produto 1, Produto 3</td>
                                        </tr>
                                        <tr>
                                            <td>Gato</td>
                                            <td>Mestiço</td>
                                            <td>5 itens consumidos.</td>
                                            <td>Produto 2</td>
                                        </tr>
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Yorkshire terrier</td>
                                            <td>3 itens consumidos.</td>
                                            <td>Produto 3, Produto 4</td>
                                        </tr>
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Pastor Alemão</td>
                                            <td>2 itens consumidos.</td>
                                            <td>Produto 4</td>
                                        </tr>
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
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Pitbull</td>
                                            <td>7 itens consumidos.</td>
                                            <td>Serviço 1, Serviço 3</td>
                                        </tr>
                                        <tr>
                                            <td>Gato</td>
                                            <td>Mestiço</td>
                                            <td>5 itens consumidos.</td>
                                            <td>Serviço 2</td>
                                        </tr>
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Yorkshire terrier</td>
                                            <td>3 itens consumidos.</td>
                                            <td>Serviço 3, Serviço 4</td>
                                        </tr>
                                        <tr>
                                            <td>Cachorro</td>
                                            <td>Pastor Alemão</td>
                                            <td>2 itens consumidos.</td>
                                            <td>Serviço 4</td>
                                        </tr>
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
                                        <tr>
                                            <td>Cliente 1</td>
                                            <td>R$ 60,00</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 2</td>
                                            <td>R$ 45,00</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 3</td>
                                            <td>R$ 43,00</td>
                                        </tr>
                                        <tr>
                                            <td>Cliente 4</td>
                                            <td>R$ 20,00</td>
                                        </tr>
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