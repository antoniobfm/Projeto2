import { Router } from "express";
import createProtocolo from "./useCases/create.usecase.js";
import getAllProtocolos from "./useCases/getAll.usecase.js";
import getSpecificProtocolo from "./useCases/getSpecific.usecase.js";
import updateProtocolo from "./useCases/update.usecase.js";
import deleteProtocolo from "./useCases/delete.usecase.js";
import getAllEtapasFromProtocolo from "./useCases/getAllEtapasFromProtocolo.usecase.js";

const protocolosRouter = Router();

// TABELA PROTOCOLO
// Insere um protocolo (é o C do CRUD - Create)
protocolosRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createProtocolo(req.body);

  res.json(result);
  res.end();
});

// Retorna todos protocolos (é o R do CRUD - Read)
protocolosRouter.get("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllProtocolos();

  res.json(result);
  res.end();
});

// Retorna protocolo especifico (é o R do CRUD - Read)
protocolosRouter.get("/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getSpecificProtocolo(req.params.protocolo_id);

  res.json(result);
  res.end();
});

// Retorna protocolo especifico e suas etapas (é o R do CRUD - Read)
protocolosRouter.get("/:protocolo_id/etapas", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllEtapasFromProtocolo(req.params.protocolo_id);

  res.json(result);
  res.end();
});

// Atualiza um protocolo (é o U do CRUD - Update)
protocolosRouter.put("/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await updateProtocolo(req.params.protocolo_id, req.body);

  res.json(result[0]);
  res.end();
});

// Exclui um protocolo (é o D do CRUD - Delete)
protocolosRouter.delete("/:protocolo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await deleteProtocolo(req.params.protocolo_id);

  res.json(result);
  res.end();
});

export default protocolosRouter;
