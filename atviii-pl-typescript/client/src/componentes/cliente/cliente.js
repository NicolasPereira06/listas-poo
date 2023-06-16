import React, { useState, useEffect } from 'react';
import Popup from '../cliente/popupEdit';
import '../styles/definitionPopup.css';
import PopupCadastro from './popupCadastro';
import PopupNewPet from '../cliente/popupNewPet';
import PopupNewRG from '../cliente/popupNewRG';
import PopupNewTelefone from '../cliente/popupNewTelefone';
import PopupConsumirProduto from './popupConsumirProduto';
import PopupAdquirirServico from './popupAdquirirServico';
import PopupEditarPet from './popupEditarPet';
import PopupDeletarPet from './popupDeletarPet';

export default function Cliente() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenCadastro, setIsPopupOpenCadastro] = useState(false);
  const [isPopupOpenPet, setIsPopupOpenPet] = useState(false);
  const [isPopupOpenRG, setIsPopupOpenRG] = useState(false);
  const [isPopupOpenTelefone, setIsPopupOpenTelefone] = useState(false);
  const [isPopupOpenConsumirProduto, setIsPopupOpenConsumirProduto] = useState(false);
  const [isPopupOpenAdquirirServico, setIsPopupOpenAdquirirServico] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isPopupOpenEditarPet, setIsPopupOpenEditarPet] = useState(false);
  const [isPopupOpenDeletarPet, setIsPopupDeletarPet] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  const handleClientClick = (cliente) => {
    if (clienteSelecionado === cliente) {
      setClienteSelecionado(null);
    } else {
      setClienteSelecionado(cliente);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopupCadastro = () => {
    setIsPopupOpenCadastro(true);
  };

  const closePopupCadastro = () => {
    setIsPopupOpenCadastro(false);
  };

  const openPopupPet = () => {
    setIsPopupOpenPet(true);
  };

  const closePopupPet = () => {
    setIsPopupOpenPet(false);
  };

  const openPopupRG = () => {
    setIsPopupOpenRG(true);
  };

  const closePopupRG = () => {
    setIsPopupOpenRG(false);
  };

  const openPopupTelefone = () => {
    setIsPopupOpenTelefone(true);
  };

  const closePopupTelefone = () => {
    setIsPopupOpenTelefone(false);
  };

  const openPopupConsumirProduto = () => {
    setIsPopupOpenConsumirProduto(true);
  };

  const closePopupConsumirProduto = () => {
    setIsPopupOpenConsumirProduto(false);
  };

  const openPopupAdquirirServico = () => {
    setIsPopupOpenAdquirirServico(true);
  };

  const closePopupAdquirirServico = () => {
    setIsPopupOpenAdquirirServico(false);
  };

  const openPopupEditarPet = () => {
    setIsPopupOpenEditarPet(true);
  };

  const closePopupEditarPet = () => {
    setIsPopupOpenEditarPet(false);
  };

  const openPopupDeletarPet = () => {
    setIsPopupDeletarPet(true);
  };

  const closePopupDeletarPet = () => {
    setIsPopupDeletarPet(false);
  };

  const clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'];

  return (
    <div className="container-fluid overflow-auto" style={{ height: `${screenHeight}px` }}>
      <button
        className="btn btn-outline-primary mb-2 ml-5"
        type="button"
        onClick={openPopupCadastro}
      >
        Cadastrar cliente
      </button>
      {isPopupOpenCadastro && (
        <div>
          <div className="overlay" onClick={closePopupCadastro}></div>
          <PopupCadastro onClose={closePopupCadastro} />
        </div>
      )}
      <div className="list-group">
        {clientes.map((cliente, index) => (
          <a
            key={index}
            href="#"
            className="list-group-item list-group-item-action"
            onClick={() => handleClientClick(cliente)}
          >
            {cliente}
          </a>
        ))}
      </div>

      {clienteSelecionado && (
        <div className="card mt-3" style={{ marginBottom: '100px' }}>
          <div className="card-body">
            <h5 className="card-title">{clienteSelecionado}</h5>
            <p className="card-text">
              <span>Nome social: Nomeado <br /></span>
            </p>
            <h5 className="card-title">Documentos:</h5>
            <p className="card-text">
              <span>CPF: XXX.XXX.XXX/XX <br /></span>
              <span>Data de Emissão do CPF: dd/mm/yyyy <br /></span>
              <span>RG: XX.XXX.XXX-X<br /></span>
              <span>Data de Emissão do RG: dd/mm/yyyy <br /></span>
            </p>
            <h5 className="card-title">Contato:</h5>
            <p className="card-text">
              <span>Telefone: (XX) XXXXX-XXXX <br /></span>
            </p>
            <h5 className="card-title">Pets:</h5>
            <p className="card-text">
              <span>Nome do pet: Nome 1 <br /></span>
              <span>Tipo do pet: Tipo X <br /></span>
              <span>Raça do pet: Raça Y <br /></span>
              <span>Gênero do pet: Gênero W <br /></span>
            </p>
            <h5 className="card-title">Produtos consumidos:</h5>
            <p className="card-text">
              <span>Produto 1: R$ 30,00 <br /></span>
              <span>Produto 2: R$ 40,00 <br /></span>
              <span>Produto 3: R$ 45,00 <br /></span>
            </p>
            <h5 className="card-title">Serviços adquiridos:</h5>
            <p className="card-text">
              <span>Serviço 1: R$ 35,00 <br /></span>
              <span>Serviço 2: R$ 41,00 <br /></span>
              <span>Serviço 3: R$ 43,00 <br /></span>
            </p>
            <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={openPopupConsumirProduto}
            >
              Consumir um produto
            </button>
            <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={openPopupAdquirirServico}
            >
              Adquirir um serviço
            </button>
            <button
              className="btn btn-outline-info"
              type="submit"
              onClick={openPopupPet}
            >
              Adicionar um novo pet
            </button>
            <button
              className="btn btn-outline-info"
              type="submit"
              onClick={openPopupRG}
            >
              Adicionar um novo RG
            </button>
            <button
              className="btn btn-outline-info"
              type="submit"
              onClick={openPopupTelefone}
            >
              Adicionar um novo telefone
            </button>
            <button
              className="btn btn-outline-warning"
              type="submit"
              onClick={openPopup}
            >
              Editar cliente
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
            >
              Excluir cliente
            </button>
            <button
              className="btn btn-outline-warning"
              type="button"
              onClick={openPopupEditarPet}
            >
              Editar pet
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={openPopupDeletarPet}
            >
              Excluir pet
            </button>
            {isPopupOpenAdquirirServico && (
              <div>
                <div className="overlay" onClick={closePopupAdquirirServico}></div>
                <PopupAdquirirServico onClose={closePopupAdquirirServico} />
              </div>
            )}
            {isPopupOpenConsumirProduto && (
              <div>
                <div className="overlay" onClick={closePopupConsumirProduto}></div>
                <PopupConsumirProduto onClose={closePopupConsumirProduto} />
              </div>
            )}
            {isPopupOpen && (
              <div>
                <div className="overlay" onClick={closePopup}></div>
                <Popup onClose={closePopup} />
              </div>
            )}
            {isPopupOpenPet && (
              <div>
                <div className="overlay" onClick={closePopupPet}></div>
                <PopupNewPet onClose={closePopupPet} />
              </div>
            )}
            {isPopupOpenRG && (
              <div>
                <div className="overlay" onClick={closePopupRG}></div>
                <PopupNewRG onClose={closePopupRG} />
              </div>
            )}
            {isPopupOpenTelefone && (
              <div>
                <div className="overlay" onClick={closePopupTelefone}></div>
                <PopupNewTelefone onClose={closePopupTelefone} />
              </div>
            )}
            {isPopupOpenEditarPet && (
              <div>
                <div className="overlay" onClick={closePopupEditarPet}></div>
                <PopupEditarPet onClose={closePopupEditarPet} />
              </div>
            )}
            {isPopupOpenDeletarPet && (
              <div>
                <div className="overlay" onClick={closePopupDeletarPet}></div>
                <PopupDeletarPet onClose={closePopupDeletarPet} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}