CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Cliente (
    ClienteID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ClienteNome VARCHAR (255) NOT NULL,
    ClienteNomeSocial VARCHAR(255) NOT NULL,
    ClienteCPF VARCHAR(11) NOT NULL,
    ClienteCPFDataEmissao VARCHAR(30) NOT NULL
);

CREATE TABLE ClienteTelefone (
    ClienteTelefoneID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ClienteID UUID NOT NULL,
    TelefoneDDD VARCHAR(255) NOT NULL,
    TelefoneNumero VARCHAR(255) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE ClienteRg (
    ClienteRgID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ClienteID UUID NOT NULL,
    ClienteRG VARCHAR(20) NOT NULL,
    ClienteRGDataEmissao VARCHAR(30) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE Pets (
    PetID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ClienteID UUID NOT NULL,
    PetNome VARCHAR(255) NOT NULL,
    PetRaca VARCHAR(255) NOT NULL,
    PetTipo VARCHAR(255) NOT NULL,
    PetGenero VARCHAR(255) NOT NULL,
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE Produto (
    ProdutoID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ProdutoNome VARCHAR(255) NOT NULL,
    ProdutoPreco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Servico (
    ServicoID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ServicoNome VARCHAR(255) NOT NULL,
    ServicoPreco DECIMAL(10, 2) NOT NULL 
);

CREATE TABLE ProdutosConsumidosCliente (
    ProdutosConsumidosClientesID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ProdutoID UUID NOT NULL,
    ClienteID UUID NOT NULL,
    ProdutoNome VARCHAR(255) NOT NULL,
    ProdutoPreco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ProdutoID) REFERENCES Produto(ProdutoID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE ServicosConsumidosCliente (
    ServicosConsumidosClientesID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ServicoID UUID NOT NULL,
    ClienteID UUID NOT NULL,
    ServicoNome VARCHAR(255) NOT NULL,
    ServicoPreco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ServicoID) REFERENCES Servico(ServicoID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);