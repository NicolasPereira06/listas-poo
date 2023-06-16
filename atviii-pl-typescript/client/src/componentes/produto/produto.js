import React, { useState } from "react";
import PopupEditProduto from "./popupEditProduto";
import "../styles/definitionPopup.css";
import PopupCadastroProduto from "./popupCadastroProduto";

export default function Produto() {
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [isOpenPopupEditProduto, setIsOpenPopupEditProduto] = useState(false);
    const [isOpenPopupCadastroProduto, setIsOpenPopupCadastroProduto] = useState(false);

    const handleProductClick = (produto) => {
        if (produtoSelecionado === produto) {
            setProdutoSelecionado(null);
        } else {
            setProdutoSelecionado(produto);
        }
    };

    const openPopupEditProduto = () => {
        setIsOpenPopupEditProduto(true);
    };

    const closePopupEditProduto = () => {
        setIsOpenPopupEditProduto(false);
    };

    const openPopupCadastroProduto = () => {
        setIsOpenPopupCadastroProduto(true);
    };

    const closePopupCadastroProduto = () => {
        setIsOpenPopupCadastroProduto(false);
    };

    const produtos = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'];

    return (
        <div className="container-fluid overflow-auto" style={{ height: '900px'}}>
            <button
                className="btn btn-outline-primary mb-2 ml-5"
                type="button"
                onClick={openPopupCadastroProduto}
            >
                Cadastrar produto
            </button>
            {isOpenPopupCadastroProduto && (
                <div>
                    <div className="overlay" onClick={closePopupCadastroProduto}></div>
                    <PopupCadastroProduto onClose={closePopupCadastroProduto} />
                </div>
            )}
            <div className="list-group">
                {produtos.map((produto, index) => (
                    <a
                        key={index}
                        href="#"
                        className="list-group-item list-group-item-action"
                        onClick={() => handleProductClick(produto)}
                    >
                        {produto}
                    </a>
                ))}
            </div>
            {produtoSelecionado && (
                <div className="card mt-3" style={{marginBottom: '100px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{produtoSelecionado}</h5>
                        <p className="card-text">
                            <span>Preço: R$ 50,00 <br /></span>
                        </p>
                        <button
                            className="btn btn-outline-warning"
                            type="submit"
                            onClick={openPopupEditProduto}
                        >
                            Editar produto
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                        >
                            Excluir produto
                        </button>
                        {isOpenPopupEditProduto && (
                            <div>
                                <div className="overlay" onClick={closePopupEditProduto}></div>
                                <PopupEditProduto onClose={closePopupEditProduto} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}