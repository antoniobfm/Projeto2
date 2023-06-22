import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";

const amostraCampoRouter = Router();

// TABELA AMOSTRA CAMPO
// Retorna todos registros (é o R do CRUD - Read)
amostraCampoRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql =
    "SELECT * FROM AMOSTRA_CAMPO WHERE amostra_campo_id = " +
    req.query.amostra_campo_id;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
amostraCampoRouter.post("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  sql =
    "INSERT INTO AMOSTRA_CAMPO (conteudo) VALUES ('" +
    req.body.amostra_campo_id +
    ")";
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>CONTEUDO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
  res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
amostraCampoRouter.put("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "UPDATE AMOSTRA_CAMPO SET conteudo ='" +
    req.body.conteudo +
    "' WHERE amostra_campo_id='" +
    req.body.amostra_campo_id +
    "'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.json(sql);
    res.end();
  });
  res.write(
    '<p>AMOSTRA CAMPO ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>'
  );
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
amostraCampoRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "DELETE FROM AMOSTRA_CAMPO WHERE amostra_campo_id='" +
    req.query.amostra_campo_id +
    "'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write(
      '<p>AMOSTRA CAMPO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>'
    );
    res.end();
  });
  db.close(); // Fecha o banco
});

export default amostraCampoRouter;
