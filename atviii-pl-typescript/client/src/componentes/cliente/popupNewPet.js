import React from "react";
import "../styles/popup.css";

export default function PopupNewPet({ onClose }) {
  return (
    <div className="popup">
      <h2>Adicionar um novo pet</h2>
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            name="nomePet"
            className="form-control"
            placeholder="Nome do pet"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="tipoPet"
            className="form-control"
            placeholder="Tipo do pet"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="racaPet"
            className="form-control"
            placeholder="Raça do pet"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            name="generoPet"
            className="form-control"
            placeholder="Gênero do pet"
          />
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={onClose}>
          Fechar
        </button>
        <button className="btn btn-outline-success" type="button">
          Adicionar pet
        </button>
      </form>
    </div>
  );
}