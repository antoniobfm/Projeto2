const { readFile } = require('fs');

const sqlite3 = require('sqlite3').verbose();
const dbPath = 'backend/mfisico.db'
const db = new sqlite3.Database(dbPath)

function verificarLogin() {
    var email = document.getElementByName("email").value
    var senha = document.getElementByName("senha").value
    console.log(email)
    console.log(senha)

    const queryEmail = `SELECT * FROM tabela WHERE emails LIKE '%' || ? || '%'`;
    const querySenha = `SELECT * FROM tabela WHERE senhas LIKE '%' || ? || '%'`;

    db.serialize(() => {
        db.all(queryEmail, [email], (error, rows) => {
          if (error) {
            throw error;
          }
      
          if (rows.length > 0) {
            console.log('Email válido.');

            db.serialize(() => {
                db.all(querySenha, [senha], (error, rows) => {
                  if (error) {
                    throw error;
                  }
              
                  if (rows.length > 0) {
                    console.log('Senha válida.');
                    //Redireciona para a home



                  } else {
                    console.log('Senha inválida.');
                  }
              
                  db.close();
                });
              });
          } else {
            console.log('Email inválido.');
          }
      
          db.close();
        });
    });

}



