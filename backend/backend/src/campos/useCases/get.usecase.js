import sqlite3 from "sqlite3";
import DBPATH from "../../shared/dbConnection.js";

const getCampo = async (campo_id) => {
  let db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql = "SELECT * FROM CAMPO WHERE campo_id=" + campo_id;

  const query = new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  const response = await query;

  db.close(); // Fecha o banco

  if (response) {
    return response[0];
  }

  return null;
};

export default getCampo;
