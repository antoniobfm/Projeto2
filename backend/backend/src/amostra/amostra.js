import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";
import getSpecificAmostra from "./useCases/getSpecific.usecase.js";
import createAmostra from "./useCases/create.usecase.js";
import updateAmostra from "./useCases/update.usecase.js";

const amostrasRouter = Router();

//TABELA AMOSTRA - consulta
// Insere um registro (é o C do CRUD - Create)
amostrasRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createAmostra(req.body);

  res.json(result[0]);
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
amostrasRouter.get("/:amostra_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getSpecificAmostra(req.params.amostra_id);

  res.json(result);
  res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
amostrasRouter.put("/:amostra_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await updateAmostra(req.body, req.params.amostra_id);

  res.json(result);
  res.end();
});

// Exclui um registro (é o D do CRUD - Delete)
amostrasRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sql =
    "DELETE FROM AMOSTRA WHERE amostra_id='" + req.query.amostra_id + "'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>AMOSTRA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

export default amostrasRouter;
