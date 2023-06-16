import { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer fixed-bottom" style={{background: '#e3f2fd',height: 100}}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h1>Pet Lovers</h1>
                            <h3>Todos os direitos reservados.</h3>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}