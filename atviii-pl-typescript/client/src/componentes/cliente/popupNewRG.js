import React from "react";
import "../styles/popup.css";

export default function PopupNewRG({ onClose }) {
  return (
    <div className="popup">
      <h2>Adicionar um novo RG</h2>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            name="RG"
            className="form-control"
            placeholder="RG"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="emissaoRG"
            className="form-control"
            placeholder="Data de emissão do RG no formato: dd/mm/yyyy"
          />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Adicionar RG
        </button>
      </form>
    </div>
  );
}
