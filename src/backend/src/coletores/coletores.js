import { Router } from "express";
import getAllColetores from "./useCases/getAll.usecase.js";
import createColetor from "./useCases/create.usecase.js";
import getSpecificColetor from "./useCases/getSpecific.usecase.js";
import getSpecificColetorProtocolos from "./useCases/getSpecificColetorProtocolos.usecase.js";
import updateColetorProtocolo from "./useCases/updateColetorProtocolo.usecase.js";

const coletoresRouter = Router();

// TABELA PROTOCOLO
// Insere um coletor (é o C do CRUD - Create)
coletoresRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createColetor(req.body);

  res.json(result);
  res.end();
});

// Retorna todos coletores (é o R do CRUD - Read)
coletoresRouter.get("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllColetores();

  res.json(result);
  res.end();
});

// Retorna todos protocolos (é o R do CRUD - Read)
coletoresRouter.get("/:COLETOR_ID", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getSpecificColetor(req.params.COLETOR_ID);

  res.json(result);
  res.end();
});

// Retorna todos protocolos que o coletor está e os que ele não está, separadamente (é o R do CRUD - Read)
coletoresRouter.get("/protocolos/:COLETOR_ID", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getSpecificColetorProtocolos(req.params.COLETOR_ID);

  res.json(result);
  res.end();
});

// Adiciona ou remove o coletor de protocolo X (é o U do CRUD - Update)
coletoresRouter.put("/protocolos/:COLETOR_ID/:PROTOCOLO_ID", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT");

  const result = await updateColetorProtocolo(req.params.COLETOR_ID, req.params.PROTOCOLO_ID, req.body.is_in);

  res.json(result);
  res.end();
});

export default coletoresRouter;
