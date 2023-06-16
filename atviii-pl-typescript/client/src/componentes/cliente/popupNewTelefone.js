import React from "react";
import "../styles/popup.css";

export default function PopupNewTelefone({ onClose }) {
  return (
    <div className="popup">
      <h2>Adicionar um novo telefone</h2>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            name="DDD"
            className="form-control"
            placeholder="DDD"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="numero"
            className="form-control"
            placeholder="Número de telefone"
          />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Adicionar telefone
        </button>
      </form>
    </div>
  );
}
