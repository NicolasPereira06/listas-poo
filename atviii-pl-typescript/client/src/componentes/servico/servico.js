import React, { useState } from "react";
import "../styles/definitionPopup.css";
import PopupCadastroServico from "./popupCadastroServico";
import PopupEditServico from "./popupEditServico";

export default function Servico() {
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [isOpenPopupEditServico, setIsOpenPopupEditServico] = useState(false);
    const [isOpenPopupCadastroServico, setIsOpenPopupCadastroServico] = useState(false);

    const handleServiceClick = (servico) => {
        if (servicoSelecionado === servico) {
            setServicoSelecionado(null);
        } else {
            setServicoSelecionado(servico);
        }
    };

    const openPopupEditServico = () => {
        setIsOpenPopupEditServico(true);
    };
    
    const closePopupEditServico = () => {
        setIsOpenPopupEditServico(false);
    };

    const openPopupCadastroServico = () => {
        setIsOpenPopupCadastroServico(true);
    };
    
    const closePopupCadastroServico = () => {
        setIsOpenPopupCadastroServico(false);
    };

    const servicos = ['Serviço 1', 'Serviço 2', 'Serviço 3', 'Serviço 4', 'Serviço 5'];

    return (
        <div className="container-fluid overflow-auto" style={{ height: '900px'}}>
            <button
                className="btn btn-outline-primary mb-2 ml-5"
                type="button"
                onClick={openPopupCadastroServico}
            >
                Cadastrar serviço
            </button>
            {isOpenPopupCadastroServico && (
                <div>
                    <div className="overlay" onClick={closePopupCadastroServico}></div>
                    <PopupCadastroServico onClose={closePopupCadastroServico} />
                </div>
            )}
            <div className="list-group">
                {servicos.map((servico, index) => (
                    <a
                        key={index}
                        href="#"
                        className="list-group-item list-group-item-action"
                        onClick={() => handleServiceClick(servico)}
                    >
                        {servico}
                    </a>
                ))}
            </div>
            {servicoSelecionado && (
                <div className="card mt-3" style={{marginBottom: '100px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{servicoSelecionado}</h5>
                        <p className="card-text">
                            <span>Preço: R$ 30,00 <br /></span>
                        </p>
                        <button
                            className="btn btn-outline-warning"
                            type="submit"
                            onClick={openPopupEditServico}
                        >
                            Editar serviço
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                        >
                            Excluir serviço
                        </button>
                        {isOpenPopupEditServico && (
                            <div>
                                <div className="overlay" onClick={closePopupEditServico}></div>
                                <PopupEditServico onClose={closePopupEditServico} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}