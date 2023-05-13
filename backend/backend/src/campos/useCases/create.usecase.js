import sqlite3 from "sqlite3";
import DBPATH from "../../shared/dbConnection.js";

const createCampo = async (data) => {
  let db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql =
    "INSERT INTO campo (etapa_id, categoria, nome) VALUES (" +
    data.etapa_id +
    ", '" +
    data.categoria +
    "', '" +
    data.nome +
    "') RETURNING *";

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
    return response;
  }

  return null;
};

export default createCampo;
