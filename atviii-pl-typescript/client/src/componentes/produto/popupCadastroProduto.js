import React from "react";
import "../styles/popup.css";

export default function PopupCadastroProduto(props) {
    return (
        <div className="popup">
            <h2>Cadastrar produto</h2>
            <form>
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
                        placeholder="Preço"
                    />
                </div>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={props.onClose}
                >
                    Fechar
                </button>
                <button
                    className="btn btn-outline-success"
                    type="button"
                >
                    Cadastrar produto
                </button>
            </form>
        </div>
    );
}