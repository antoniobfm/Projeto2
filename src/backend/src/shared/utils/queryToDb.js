import sqlite3 from "sqlite3";
import DBPATH from "../dbConnection.js";

async function queryToDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DBPATH); // Abre o banco

    db.all(sql, [...params], (err, rows) => {
      if (err) {
        throw err;
      }
      resolve(rows);
    });

    db.close(); // Fecha o banco
  });
}

export default queryToDb;
