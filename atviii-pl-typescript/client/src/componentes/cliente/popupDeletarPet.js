import React from "react";
import "../styles/popup.css";

export default function PopupDeletarPet({ onClose }) {
  return (
    <div className="popup">
      <h2>Deletar um pet</h2>
      <form>
        <div className="input-group mb-3">
            <input
              type="text"
              name="indice"
              className="form-control"
              placeholder="Índice do pet que deseja deletar: (Início em 0)"
            />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Deletar pet
        </button>
      </form>
    </div>
  );
}
