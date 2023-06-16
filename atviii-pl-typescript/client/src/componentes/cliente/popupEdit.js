import React from "react";
import "../styles/popup.css";

export default function Popup({ onClose }) {
  return (
    <div className="popup">
      <h2>Editar cliente</h2>
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
            name="nomeSocial"
            className="form-control"
            placeholder="Nome social"
          />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Editar cliente
        </button>
      </form>
    </div>
  );
}
