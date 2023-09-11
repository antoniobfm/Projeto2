import { Router } from "express";
import getAllFromSpecificColetor from "./useCases/getAllFromSpecificColetor.usecase.js";

const coletorProtocoloRouter = Router();

//TABELA COLETOR - consulta
// Retorna todos registros (é o R do CRUD - Read)
coletorProtocoloRouter.get("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  // Pega o id do coletor pelos cookies
  const coletor_id = req.headers.cookie && req.headers.cookie.split("=")[1] || 3;

  console.log(coletor_id)

  const result = await getAllFromSpecificColetor(coletor_id);

  res.setHeader("Set-Cookie", `id=${3}`);
  res.json(result);
  res.end();
});

// // Insere um registro (é o C do CRUD - Create)
// coletorProtocoloRouter.post("/", (req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   var db = new sqlite3.Database(DBPATH); // Abre o banco
//   sql =
//     "INSERT INTO COLETOR_PROTOCOLO (coletor_id, protocolo_id) VALUES ('" +
//     req.body.coletor_id +
//     "', '" +
//     req.body.protocolo_id +
//     ")";
//   db.run(sql, [], (err) => {
//     if (err) {
//       throw err;
//     }
//   });
//   res.write(
//     '<p> COLETOR PROTOCOLO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>'
//   );
//   db.close(); // Fecha o banco
//   res.end();
// });

// // Exclui um registro (é o D do CRUD - Delete)
// coletorProtocoloRouter.delete("/", (req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   sql =
//     "DELETE FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id ='" +
//     req.query.coletor_protocolo_id +
//     "'";
//   var db = new sqlite3.Database(DBPATH); // Abre o banco
//   db.run(sql, [], (err) => {
//     if (err) {
//       throw err;
//     }
//     res.write(
//       '<p>COLETOR PROTOCOLO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>'
//     );
//     res.end();
//   });
//   db.close(); // Fecha o banco
// });

export default coletorProtocoloRouter;
