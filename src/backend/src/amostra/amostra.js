import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";
import getSpecificAmostra from "./useCases/getSpecific.usecase.js";
import createAmostra from "./useCases/create.usecase.js";
import updateAmostra from "./useCases/update.usecase.js";
import getAmostrasAsCSV from "./useCases/getAmostrasAsCSV.usecase.js";
import getAmostrasAsXLSX from "./useCases/getAmostrasAsXLSX.usecase.js";
import getAmostrasAsSQL from "./useCases/getAmostrasAsSQL.usecase.js";
import getAllAmostrasFromProtocolo from "./useCases/getAllAmostrarFromProtocolo.usecase.js";

const amostrasRouter = Router();

//TABELA AMOSTRA - consulta
// Insere um registro (é o C do CRUD - Create)
amostrasRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const coletor_id = 3;

  const result = await createAmostra({
    ...req.body,
    coletor_id: coletor_id,
  });

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

// Retorna todos registros (é o R do CRUD - Read)
amostrasRouter.get("/protocolo/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllAmostrasFromProtocolo(req.params.protocolo_id);

  res.json(result);
  res.end();
});

// Retorna todos as amostras de um determinado protocolo em
// formato CSV
amostrasRouter.get("/csv/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAmostrasAsCSV(req.params.protocolo_id);

  res.json(result);
  res.end();
});

// Retorna todos as amostras de um determinado protocolo em
// formato XLSX
amostrasRouter.get("/xlsx/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAmostrasAsXLSX(req.params.protocolo_id);

  res.json(result);
  res.end();
});

// Retorna todos as amostras de um determinado protocolo em
// formato SQL
amostrasRouter.get("/sql/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAmostrasAsSQL(req.params.protocolo_id);

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
