import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import { UUID } from "crypto";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Lista5",
  password: "nicolas123",
  port: 5432,
});

interface Client {
  id: UUID;
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataEmissaoCPF: string;
  rg: { numero: string; dataEmissao: string }[];
  telefone: {ddd: string; numero: string}[];
  pets: { nome: string; tipo: string; raca: string; genero: string }[];
  produtosConsumidos: {nomeProduto: string; preco: string}[];
  servicosConsumidos: {nomeServico: string; preco: string}[];
}

interface Produto {
  ProdutoID: UUID;
  nomeProduto: string;
  preco: string;
}

interface Servico {
  ServicoID: UUID;
  nomeServico: string;
  preco: string;
}

interface ProdutoConsumido {
  nomeProduto: string;
  preco: string;
}

interface ServicoConsumido {
  nomeServico: string;
  preco: string;
}

interface Consumidores {
  nome: string;
  totalConsumido: number;
}

interface ProdutoMaisConsumido {
  nomeProduto: string;
  quantidade: number;
}

interface ServicoMaisConsumido {
  nomeServico: string;
  quantidade: number;
}

interface ProdutoConsumidoPorPet {
  tipo: string;
  raca: string;
  quantidade: number;
  produtos: string;
}

interface ServicoConsumidoPorPet {
  tipo: string;
  raca: string;
  quantidade: number;
  servicos: string;
}

interface ClienteConsumoValor {
  nome: string;
  totalConsumidoValor: number;
}


const app = express();
app.use(cors());
app.use(express.json());

//CRUD Clientes e pets
app.post("/CadastroClientes", async (req: Request, res: Response) => {
  const novoCliente: Client = req.body;

  try {
    const { nome, nomeSocial, cpf, dataEmissaoCPF, rg, telefone, pets } = novoCliente;

    const cpfExistente = await pool.query("SELECT ClienteID FROM Cliente WHERE ClienteCPF = $1", [novoCliente.cpf]);

    if (cpfExistente.rowCount > 0) {
      return res.status(400).json({ message: "CPF já cadastrado." });
    }

    let SQL  = "INSERT INTO Cliente (ClienteNome, ClienteNomeSocial, ClienteCPF, ClienteCPFDataEmissao) VALUES ($1, $2, $3, $4) RETURNING ClienteID";
    pool.query(SQL, [nome, nomeSocial, cpf, dataEmissaoCPF], (err, result) => {
      if (err) {
        console.log(err)
        res.send(err)
      }else {
        console.log('Cliente Inserido')
        console.log(result.rows.values().next())
        console.log(result.rows[0].clienteid)

        const clienteID = result.rows[0].clienteid

        if (clienteID) {
          let SQL2 = "INSERT INTO Pets (ClienteID, PetNome, PetRaca, PetTipo, PetGenero) VALUES ($1, $2, $3, $4, $5)"
          for (const petItem of pets) {
            pool.query(SQL2, [clienteID, petItem.nome, petItem.tipo, petItem.raca, petItem.genero], (err, result) => {
              if (err) {
                console.log(err)
              }else {
                console.log('Pet inserido')
              }
            })
          }

          let SQL3 = "INSERT INTO ClienteTelefone (ClienteID, TelefoneDDD, TelefoneNumero) VALUES ($1, $2, $3)"
          for (const telefoneItem of telefone) {
            pool.query(SQL3, [clienteID, telefoneItem.ddd, telefoneItem.numero], (err, result) => {
              if (err) {
                  console.log(err)
              } else {
                  console.log('Telefone inserido.')
              }

            })
          }

          let SQL4 = "INSERT INTO ClienteRg (ClienteID, ClienteRg, ClienteRGDataEmissao) VALUES ($1, $2, $3)"
          for (const rgItem of rg) {
            pool.query(SQL4, [clienteID, rgItem.numero, rgItem.dataEmissao], (err, result) => {
              if (err) {
                console.log(err)
              }else {
                console.log('RG Inserido')
              }
            })
          }
        }
      }
    })

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).json("Erro ao cadastrar cliente.");
  }
});

app.get("/ListarClientes", async (req: Request, res: Response) => {
  try {
    const clientesQuery = "SELECT * FROM Cliente";
    const clientesResult = await pool.query(clientesQuery);
    const clientes = clientesResult.rows;

    const rgQuery = "SELECT * FROM ClienteRg";
    const rgResult = await pool.query(rgQuery);
    const rgMap = rgResult.rows.reduce((map: any, rg: any) => {
      const clienteId = rg.clienteid;
      if (!map[clienteId]) {
        map[clienteId] = [];
      }
      map[clienteId].push({ numero: rg.clienterg, dataEmissao: rg.clientergdataemissao });
      return map;
    }, {});

    const telefoneQuery = "SELECT * FROM ClienteTelefone";
    const telefoneResult = await pool.query(telefoneQuery);
    const telefoneMap = telefoneResult.rows.reduce((map: any, telefone: any) => {
      const clienteId = telefone.clienteid;
      if (!map[clienteId]) {
        map[clienteId] = [];
      }
      map[clienteId].push({ ddd: telefone.telefoneddd, numero: telefone.telefonenumero });
      return map;
    }, {});

    const petsQuery = "SELECT * FROM Pets";
    const petsResult = await pool.query(petsQuery);
    const petsMap = petsResult.rows.reduce((map: any, pet: any) => {
      const clienteId = pet.clienteid;
      if (!map[clienteId]) {
        map[clienteId] = [];
      }
      map[clienteId].push({ nome: pet.petnome, tipo: pet.pettipo, raca: pet.petraca, genero: pet.petgenero });
      return map;
    }, {});

    const produtosQuery = "SELECT * FROM ProdutosConsumidosCliente";
    const produtosResult = await pool.query(produtosQuery);
    const produtosConsumidosMap = produtosResult.rows.reduce((map: any, produto: any) => {
      const clienteId = produto.clienteid;
      if (!map[clienteId]) {
        map[clienteId] = [];
      }
      map[clienteId].push({nomeProduto: produto.produtonome, preco: produto.produtopreco });
      return map;
    }, {});

    const servicosQuery = "SELECT * FROM ServicosConsumidosCliente";
    const servicosResult = await pool.query(servicosQuery);
    const servicosConsumidosMap = servicosResult.rows.reduce((map: any, servico: any) => {
      const clienteId = servico.clienteid;
      if (!map[clienteId]) {
        map[clienteId] = [];
      }
      map[clienteId].push({nomeServico: servico.serviconome, preco: servico.servicopreco });
      return map;
    }, {});

    const listaClientes: Client[] = clientes.map((cliente: any) => {
      const clienteId = cliente.clienteid;
      return {
        id: cliente.clienteid,
        nome: cliente.clientenome,
        nomeSocial: cliente.clientenomesocial,
        cpf: cliente.clientecpf,
        dataEmissaoCPF: cliente.clientecpfdataemissao,
        rg: rgMap[clienteId] || [],
        telefone: telefoneMap[clienteId] || [],
        pets: petsMap[clienteId] || [],
        produtosConsumidos: produtosConsumidosMap[clienteId] || [],
        servicosConsumidos: servicosConsumidosMap[clienteId] || [],
      };
    });

    res.json(listaClientes);
  } catch (error) {
    console.error("Erro ao obter lista de clientes:", error);
    res.status(500).json("Erro ao obter lista de clientes.");
  }
});

app.put("/EditarCliente/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, nomeSocial } = req.body;

  try {
    const updateQuery = "UPDATE Cliente SET ClienteNome = $1, ClienteNomeSocial = $2 WHERE ClienteID = $3";
    const updateValues = [nome, nomeSocial, id];
    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    res.status(500).json("Erro ao editar cliente.");
  }
});

app.put("/EditarPet/:indice", async (req: Request, res: Response) => {
  const { indice } = req.params;
  const { nomePet, tipoPet, racaPet, generoPet } = req.body;

  try {
    let SQL = "UPDATE Pets SET PetNome = $1, PetTipo = $2, PetRaca = $3, PetGenero = $4 WHERE PetNome = $5;";
    pool.query(SQL, [nomePet, tipoPet, racaPet, generoPet, indice], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Pet Editado')
      }
    })

    res.status(200).json({ message: "Pet atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao editar Pet:", error);
    res.status(500).json("Erro ao editar Pet.");
  }
});

app.delete("/ExcluirCliente/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  try {

    let SQL = "DELETE FROM Pets WHERE ClienteID = $1";
    pool.query(SQL, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL2 = "DELETE FROM ClienteTelefone WHERE ClienteID = $1";
    pool.query(SQL2, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL3 = "DELETE FROM ClienteRg WHERE ClienteID = $1";
    pool.query(SQL3, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL5 = "DELETE FROM ProdutosConsumidosCliente WHERE ClienteID = $1";
    pool.query(SQL5, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL6 = "DELETE FROM ServicosConsumidosCliente WHERE ClienteID = $1";
    pool.query(SQL6, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL4 = "DELETE FROM Cliente WHERE ClienteID = $1";
    pool.query(SQL4, [id], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    res.status(200).json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json("Erro ao excluir cliente.");
  }
});

app.delete("/ExcluirPet/:indice", async (req: Request, res: Response) => {
  const { indice } = req.params;

  let SQL = "DELETE FROM Pets WHERE PetNome = $1";
  pool.query(SQL, [indice], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Erro ao excluir o pet" });
    } else {
      console.log('Deletado');
      res.status(200).json({ message: "Pet excluído com sucesso" });
    }
  });
});


// CRUD Produtos
app.post('/CadastroProdutos', (req, res) => {
  const { nomeProduto, preco } = req.body;

  let SQL = "SELECT COUNT(*) AS count FROM Produto WHERE LOWER(ProdutoNome) = LOWER($1)";
  pool.query(SQL, [nomeProduto], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const count = result.rows[0].count;
      if (count > 0) {
        res.status(400).json({ error: "Já existe um produto com esse nome." });
      } else {
        SQL = "INSERT INTO Produto (ProdutoNome, ProdutoPreco) VALUES ($1, $2)";
        pool.query(SQL, [nomeProduto, preco], (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Produto inserido');
            res.status(200).json({ message: 'Produto inserido com sucesso.', data: result.rows.values().next() });
          }
        });
      }
    }
  });
});

app.get("/ListarProdutos", async (req: Request, res: Response) => {
  try {
    const selectQuery = "SELECT * FROM Produto";
    const result = await pool.query(selectQuery);

    const produtos: Produto[] = result.rows.map((row: any) => {
      return {
        ProdutoID: row.produtoid,
        nomeProduto: row.produtonome,
        preco: row.produtopreco,
      };
    });
    
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json("Erro ao listar produtos.");
  }
});

app.put("/EditarProduto/:ProdutoID", async (req: Request, res: Response) => {
  const { ProdutoID } = req.params;
  const { nomeProduto, preco } = req.body;

  let SQL = "SELECT COUNT(*) AS count FROM Produto WHERE LOWER(ProdutoNome) = LOWER($1)";
  pool.query(SQL, [nomeProduto], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const count = result.rows[0].count;
      if (count > 0) {
        res.status(400).json({ error: "Já existe um produto com esse nome." });
      } else {
        SQL = "UPDATE Produto SET ProdutoNome = $1, ProdutoPreco = $2 WHERE ProdutoID = $3;";
        pool.query(SQL, [nomeProduto, preco, ProdutoID], (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Produto Editado');
            res.status(200).json({ message: "Produto atualizado com sucesso." });
          }
        });
      }
    }
  });
});

app.delete("/ExcluirProduto/:produtoID", async (req: Request, res: Response) => {
  const { produtoID } = req.params

  let SQL2 = "DELETE FROM ProdutosConsumidosCliente WHERE ProdutoID = $1";
  pool.query(SQL2, [produtoID], (err, result) => {
    if (err) {
      console.log(err)
    }else {
      console.log('Deletado')
    }
  })

  let SQL = "DELETE FROM Produto WHERE ProdutoID = $1";
  pool.query(SQL, [produtoID], (err, result) => {
    if (err) {
      console.log(err)
    }else {
      console.log('Deletado')
    }
  })
});


// CRUD Serviços
app.post('/CadastroServicos', (req, res) => {
  const { nomeServico, preco } = req.body;

  let SQL = "SELECT COUNT(*) AS count FROM Servico WHERE LOWER(ServicoNome) = LOWER($1)";
  pool.query(SQL, [nomeServico], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const count = result.rows[0].count;
      if (count > 0) {
        res.status(400).json({ error: "Já existe um serviço com esse nome." });
      } else {
        SQL = "INSERT INTO Servico (ServicoNome, ServicoPreco) VALUES ($1, $2)";
        pool.query(SQL, [nomeServico, preco], (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Serviço inserido');
            res.status(200).json({ message: 'Serviço inserido com sucesso.', data: result.rows.values().next() });
          }
        });
      }
    }
  });
});

app.get("/ListarServicos", async (req: Request, res: Response) => {
  try {
    const selectQuery = "SELECT * FROM Servico";
    const result = await pool.query(selectQuery);

    const servicos: Servico[] = result.rows.map((row: any) => {
      return {
        ServicoID: row.servicoid,
        nomeServico: row.serviconome,
        preco: row.servicopreco,
      };
    });

    res.status(200).json(servicos);
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    res.status(500).json("Erro ao listar serviços.");
  }
});

app.put("/EditarServico/:ServicoID", async (req: Request, res: Response) => {
  const { ServicoID } = req.params;
  const { nomeServico, preco } = req.body;

  // Verificar se já existe um serviço com o mesmo nome, excluindo o próprio serviço que está sendo editado
  let SQL = "SELECT COUNT(*) AS count FROM Servico WHERE LOWER(ServicoNome) = LOWER($1) AND ServicoID <> $2";
  pool.query(SQL, [nomeServico, ServicoID], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const count = result.rows[0].count;
      if (count > 0) {
        res.status(400).json({ error: "Já existe um serviço com esse nome." });
      } else {
        // Nenhum serviço com o mesmo nome encontrado, realizar a edição
        SQL = "UPDATE Servico SET ServicoNome = $1, ServicoPreco = $2 WHERE ServicoID = $3;";
        pool.query(SQL, [nomeServico, preco, ServicoID], (err, result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Serviço Editado');
            res.status(200).json({ message: "Serviço atualizado com sucesso." });
          }
        });
      }
    }
  });
});

app.delete("/ExcluirServico/:servicoID", async (req: Request, res: Response) => {
  const { servicoID } = req.params;

  try {

    let SQL2 = "DELETE FROM ServicosConsumidosCliente WHERE ServicoID = $1";
    pool.query(SQL2, [servicoID], (err, result) => {
      if (err) {
        console.log(err)
      }else {
        console.log('Deletado')
      }
    })

    let SQL = "DELETE FROM Servico WHERE ServicoID = $1";
    pool.query(SQL, [servicoID], (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('Serviço excluído');
        res.status(200).json({ message: "Serviço excluído com sucesso." });
      }
    });
  } catch (error) {
    console.error("Erro ao excluir o serviço:", error);
    res.status(500).json("Erro ao excluir o serviço.");
  }
});


// Adições
app.post('/CadastroPet', (req, res) => {
  const { cpfCliente } = req.body
  const { nomePet, tipoPet, racaPet, generoPet } = req.body

  let SQL1 = "SELECT * FROM Cliente WHERE ClienteCPF = $1"

  pool.query(SQL1, [cpfCliente], (err, result) => {
      if (err) {
          console.log(err)
      } else {
          const clienteID = result.rows[0].clienteid

          let SQL2 = "INSERT INTO Pets (ClienteID, PetNome, PetRaca, PetTipo, PetGenero) VALUES ($1, $2, $3, $4, $5)"

          pool.query(SQL2, [clienteID, nomePet, tipoPet, racaPet, generoPet], (err, result) => {
              if (err) {
                  console.log(err)
                  res.send(err)
              } else {
                  console.log('Pet Inserido')
                  res.send({ msg: 'Pet adicionado com sucesso.', data: result.rows.values().next() })
              }
          })
      }
  })
})

app.post('/CadastroTelefone', (req, res) => {
  const { cpfCliente } = req.body
  const { ddd, numero } = req.body

  let SQL1 = "SELECT * FROM Cliente WHERE ClienteCPF = $1"

  pool.query(SQL1, [cpfCliente], (err, result) => {
      if (err) {
          console.log(err)
      } else {
          const clienteID = result.rows[0].clienteid

          let SQL2 = "INSERT INTO ClienteTelefone (ClienteID, TelefoneDDD, TelefoneNumero) VALUES ($1, $2, $3)"

          pool.query(SQL2, [clienteID, ddd, numero], (err, result) => {
              if (err) {
                  console.log(err)
                  res.send(err)
              } else {
                  console.log('Telefone Inserido')
                  res.send({ msg: 'Telefone adicionado com sucesso.', data: result.rows.values().next() })
              }
          })
      }
  })
})

app.post('/CadastroRG', (req, res) => {
  const { cpfCliente } = req.body
  const { numero, dataEmissao } = req.body

  let SQL1 = "SELECT * FROM Cliente WHERE ClienteCPF = $1"

  pool.query(SQL1, [cpfCliente], (err, result) => {
      if (err) {
          console.log(err)
      } else {
          const clienteID = result.rows[0].clienteid

          let SQL2 = "INSERT INTO ClienteRg (ClienteID, ClienteRg, ClienteRGDataEmissao) VALUES ($1, $2, $3)"

          pool.query(SQL2, [clienteID, numero, dataEmissao], (err, result) => {
              if (err) {
                  console.log(err)
                  res.send(err)
              } else {
                  console.log('RG Inserido')
                  res.send({ msg: 'RG adicionado com sucesso.', data: result.rows.values().next() })
              }
          })
      }
  })
})

// Consumir Produto
app.post("/ConsumirProduto", async (req: Request, res: Response) => {
  const cpfCliente = req.body.cpfCliente;
  const nomeProduto = req.body.nomeProduto;

  try {
    const clienteQuery = "SELECT ClienteID FROM Cliente WHERE ClienteCPF = $1";
    const clienteResult = await pool.query(clienteQuery, [cpfCliente]);
    const clienteID = clienteResult.rows[0].clienteid;

    const produtoQuery = "SELECT ProdutoID, ProdutoPreco FROM Produto WHERE ProdutoNome = $1";
    const produtoResult = await pool.query(produtoQuery, [nomeProduto]);
    const produtoID = produtoResult.rows[0].produtoid;
    const produtoPreco = produtoResult.rows[0].produtopreco;

    const insertQuery =
      "INSERT INTO ProdutosConsumidosCliente (ProdutoID, ClienteID, ProdutoNome, ProdutoPreco) VALUES ($1, $2, $3, $4)";
    await pool.query(insertQuery, [produtoID, clienteID, nomeProduto, produtoPreco]);

    res.status(200).json({ message: "Produto consumido com sucesso." });
  } catch (error) {
    res.status(500).json("Erro ao consumir produto.");
  }
});

// Adquirir Serviço
app.post("/AdquirirServico", async (req: Request, res: Response) => {
  const cpfCliente = req.body.cpfCliente;
  const nomeServico = req.body.nomeServico;

  try {
    const clienteQuery = "SELECT ClienteID FROM Cliente WHERE ClienteCPF = $1";
    const clienteResult = await pool.query(clienteQuery, [cpfCliente]);
    const clienteID = clienteResult.rows[0].clienteid;

    const servicoQuery = "SELECT ServicoID, ServicoPreco FROM Servico WHERE ServicoNome = $1";
    const servicoResult = await pool.query(servicoQuery, [nomeServico]);
    const servicoID = servicoResult.rows[0].servicoid;
    const servicoPreco = servicoResult.rows[0].servicopreco;

    const insertQuery =
      "INSERT INTO ServicosConsumidosCliente (ServicoID, ClienteID, ServicoNome, ServicoPreco) VALUES ($1, $2, $3, $4)";
    await pool.query(insertQuery, [servicoID, clienteID, nomeServico, servicoPreco]);

    res.status(200).json({ message: "Servico consumido com sucesso." });
  } catch (error) {
    res.status(500).json("Erro ao consumir Servico.");
  }
});

// Lista todos os produtos
app.get("/TodosProdutosConsumidos", async (req: Request, res: Response) => {
  try {
    const selectQuery = "SELECT ProdutoNome, ProdutoPreco FROM ProdutosConsumidosCliente";
    const result = await pool.query(selectQuery);

    const produtosConsumidos: ProdutoConsumido[] = result.rows.map((row: any) => {
      return {
        nomeProduto: row.produtonome,
        preco: row.produtopreco,
      };
    });

    res.status(200).json(produtosConsumidos);
  } catch (error) {
    console.error("Erro ao listar produtos consumidos:", error);
    res.status(500).json("Erro ao listar produtos consumidos.");
  }
});

// Lista todos os serviços
app.get("/TodosServicosConsumidos", async (req: Request, res: Response) => {
  try {
    const selectQuery = "SELECT ServicoNome, ServicoPreco FROM ServicosConsumidosCliente";
    const result = await pool.query(selectQuery);

    const servicosConsumidos: ServicoConsumido[] = result.rows.map((row: any) => {
      return {
        nomeServico: row.serviconome,
        preco: row.servicopreco,
      };
    });

    res.status(200).json(servicosConsumidos);
  } catch (error) {
    console.error("Erro ao listar Servicos consumidos:", error);
    res.status(500).json("Erro ao listar Servicos consumidos.");
  }
});

// 10 Clientes que mais Consumiram em quantidade
app.get("/ClientesMaisConsumiram", async (req: Request, res: Response) => {
  try {

    const selectQuery = `
    SELECT c.ClienteNome AS nome,
    COALESCE(p.produtos_consumidos, 0) + COALESCE(s.servicos_consumidos, 0) AS totalConsumido
    FROM Cliente c
    LEFT JOIN (
    SELECT ClienteID, COUNT(ProdutoID) AS produtos_consumidos
    FROM ProdutosConsumidosCliente
    GROUP BY ClienteID
    ) p ON c.ClienteID = p.ClienteID
    LEFT JOIN (
    SELECT ClienteID, COUNT(ServicoID) AS servicos_consumidos
    FROM ServicosConsumidosCliente
    GROUP BY ClienteID
    ) s ON c.ClienteID = s.ClienteID
    ORDER BY totalConsumido DESC
    LIMIT 10;
    `;
    const result = await pool.query(selectQuery);

    const consumidores: Consumidores[] = result.rows.map((row: any) => {
      return {
        nome: row.nome,
        totalConsumido: row.totalconsumido,
      };
    });

    res.status(200).json(consumidores);
  } catch (error) {
    console.error("Erro ao listar clientes que mais consumiram:", error);
    res.status(500).json("Erro ao listar clientes que mais consumiram.");
  }
});

// Produtos mais consumidos
app.get("/ProdutosMaisConsumidos", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT ProdutoNome, COUNT(*) AS quantidade
      FROM ProdutosConsumidosCliente
      GROUP BY ProdutoNome
      ORDER BY quantidade DESC
      LIMIT 10
    `;
    const result = await pool.query(query);

    const produtosContagem: ProdutoMaisConsumido[] = result.rows.map((row: any) => {
      return {
        nomeProduto: row.produtonome,
        quantidade: row.quantidade,
      };
    });

    res.status(200).json(produtosContagem);
  } catch (error) {
    console.error("Erro ao obter produtos mais consumidos:", error);
    res.status(500).json("Erro ao obter produtos mais consumidos.");
  }
});

// Serviços mais consumido
app.get("/ServicosMaisConsumidos", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT ServicoNome, COUNT(*) AS quantidade
      FROM ServicosConsumidosCliente
      GROUP BY ServicoNome
      ORDER BY quantidade DESC
      LIMIT 10
    `;
    const result = await pool.query(query);

    const servicosContagem: ServicoMaisConsumido[] = result.rows.map((row: any) => {
      return {
        nomeServico: row.serviconome,
        quantidade: row.quantidade,
      };
    });

    res.status(200).json(servicosContagem);
  } catch (error) {
    console.error("Erro ao obter serviços mais consumidos:", error);
    res.status(500).json("Erro ao obter serviços mais consumidos.");
  }
});

// Produtos consumidos por pet
app.get("/ProdutosMaisConsumidosPorPet", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT p.PetTipo AS tipo, p.PetRaca AS raca, COUNT(*) AS quantidade, STRING_AGG(DISTINCT pc.ProdutoNome, ', ') AS produtos
      FROM Cliente c
      JOIN Pets p ON c.ClienteID = p.ClienteID
      LEFT JOIN ProdutosConsumidosCliente pc ON c.ClienteID = pc.ClienteID
      GROUP BY p.PetTipo, p.PetRaca
      HAVING COUNT(pc.ProdutoNome) > 0
    `;
    const result = await pool.query(query);

    const produtosPorPet: ProdutoConsumidoPorPet[] = result.rows.map((row: any) => {
      return {
        tipo: row.tipo,
        raca: row.raca,
        quantidade: row.quantidade,
        produtos: row.produtos,
      };
    });

    res.status(200).json(produtosPorPet);
  } catch (error) {
    console.error("Erro ao obter produtos mais consumidos por pet:", error);
    res.status(500).json("Erro ao obter produtos mais consumidos por pet.");
  }
});

// Servicos consumidos por pet
app.get("/ServicosMaisConsumidosPorPet", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT p.PetTipo AS tipo, p.PetRaca AS raca, COUNT(*) AS quantidade, STRING_AGG(DISTINCT sc.ServicoNome, ', ') AS servicos
      FROM Cliente c
      JOIN Pets p ON c.ClienteID = p.ClienteID
      LEFT JOIN ServicosConsumidosCliente sc ON c.ClienteID = sc.ClienteID
      GROUP BY p.PetTipo, p.PetRaca
      HAVING COUNT(sc.ServicoNome) > 0
    `;
    const result = await pool.query(query);

    const servicosPorPet: ServicoConsumidoPorPet[] = result.rows.map((row: any) => {
      return {
        tipo: row.tipo,
        raca: row.raca,
        quantidade: row.quantidade,
        servicos: row.servicos,
      };
    });

    res.status(200).json(servicosPorPet);
  } catch (error) {
    console.error("Erro ao obter serviços mais consumidos por pet:", error);
    res.status(500).json("Erro ao obter serviços mais consumidos por pet.");
  }
});

//5 clientes que mais consumiram em valor
app.get("/ClientesMaisConsumiramValor", async (req: Request, res: Response) => {
  try {
    const selectQuery = `
      SELECT c.ClienteNome AS nome, SUM(COALESCE(p.ProdutoPreco, 0) + COALESCE(s.ServicoPreco, 0)) AS totalConsumidoValor
      FROM Cliente c
      LEFT JOIN (
        SELECT pc.ClienteID, SUM(pr.ProdutoPreco) AS ProdutoPreco
        FROM ProdutosConsumidosCliente pc
        INNER JOIN Produto pr ON pc.ProdutoID = pr.ProdutoID
        GROUP BY pc.ClienteID
      ) p ON c.ClienteID = p.ClienteID
      LEFT JOIN (
        SELECT sc.ClienteID, SUM(se.ServicoPreco) AS ServicoPreco
        FROM ServicosConsumidosCliente sc
        INNER JOIN Servico se ON sc.ServicoID = se.ServicoID
        GROUP BY sc.ClienteID
      ) s ON c.ClienteID = s.ClienteID
      GROUP BY c.ClienteID
      HAVING SUM(COALESCE(p.ProdutoPreco, 0) + COALESCE(s.ServicoPreco, 0)) > 0
      ORDER BY totalConsumidoValor DESC
      LIMIT 5
    `;
    const result = await pool.query(selectQuery);

    const clientesOrdenados: ClienteConsumoValor[] = result.rows.map((row: any) => {
      return {
        nome: row.nome,
        totalConsumidoValor: parseFloat(row.totalconsumidovalor),
      };
    });

    res.status(200).json(clientesOrdenados);
  } catch (error) {
    console.error("Erro ao obter os clientes que mais consumiram em valor:", error);
    res.status(500).json("Erro ao obter os clientes que mais consumiram em valor.");
  }
});

app.listen(3001, () => {
  console.log("Servidor iniciado na porta 3001");
});
