import React from "react";
import "../styles/popup.css";

export default function PopupConsumirProduto({ onClose }) {
  return (
    <div className="popup">
      <h2>Consumir um produto</h2>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            name="cpfCliente"
            className="form-control"
            placeholder="Digite o CPF do cliente"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="nomeProdutoConsumir"
            className="form-control"
            placeholder="Digite o nome do produto que deseja consumir"
          />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Consumir produto
        </button>
      </form>
    </div>
  );
}