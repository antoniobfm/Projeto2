import express from "express";
import path from "path";
import routes from "./routes.js";

const hostname = "localhost";
const port = 3334;
const app = express();

const __dirname = path.resolve();

/* Colocar toda a parte estática no frontend */
app.use(express.static(path.join(__dirname, "uploads")));

console.log(path.join(__dirname, "uploads"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

/* Permite requisições da porta 3000 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Aplica as rotas */
app.use(routes);

/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
