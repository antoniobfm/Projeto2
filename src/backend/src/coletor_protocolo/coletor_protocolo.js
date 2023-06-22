import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";

const coletorProtocoloRouter = Router();

//TABELA COLETOR - consulta
// NÃO IMPLEMENTADO NO BANCO
// Retorna todos registros (é o R do CRUD - Read)
coletorProtocoloRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql =
    "SELECT * FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id = " +
    req.query.coletor_protocolo_id;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
coletorProtocoloRouter.post("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  sql =
    "INSERT INTO COLETOR_PROTOCOLO (coletor_id, protocolo_id) VALUES ('" +
    req.body.coletor_id +
    "', '" +
    req.body.protocolo_id +
    ")";
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write(
    '<p> COLETOR PROTOCOLO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>'
  );
  db.close(); // Fecha o banco
  res.end();
});

// Exclui um registro (é o D do CRUD - Delete)
coletorProtocoloRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "DELETE FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id ='" +
    req.query.coletor_protocolo_id +
    "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write(
      '<p>COLETOR PROTOCOLO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>'
    );
    res.end();
  });
  db.close(); // Fecha o banco
});

export default coletorProtocoloRouter;
