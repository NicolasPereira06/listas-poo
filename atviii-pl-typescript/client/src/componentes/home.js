import React from "react";
import Footer from "./roteadorBarraFooter/footer";
import "../componentes/styles/home.css";

export default function Home() {
  return (
    <div className="container-fluid custom-container">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "84vh" }}
      >
        <div className="custom-div">
          <p className="display-2">
            <b>Pet Lovers</b>
          </p>
          <p className="mt-4 display-5">
            Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinárias.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}