import { Router } from "express";
import createEtapa from "./useCases/create.usecase.js";
import getSpecificEtapa from "./useCases/getSpecific.usecase.js";
import deleteEtapa from "./useCases/delete.usecase.js";
import getAllCamposFromEtapa from "./useCases/getAllCamposFromEtapa.usecase.js";

const etapaRouter = Router();

// TABELA ETAPA
// Insere um registro (é o C do CRUD - Create)
etapaRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createEtapa(req.body);

  res.json(result[0]);
  res.end();
});

// Retorna todas as etapas de um protocolo especifico (é o R do CRUD - Read)
etapaRouter.get("/:etapa_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getSpecificEtapa(req.params.etapa_id);

  res.json(result[0]);
  res.end();
});

// Retorna todas as etapas de um protocolo especifico (é o R do CRUD - Read)
etapaRouter.get("/:etapa_id/campos", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllCamposFromEtapa(req.params.etapa_id);

  res.json(result[0]);
  res.end();
});

// Exclui um registro (é o D do CRUD - Delete)
etapaRouter.delete("/:etapa_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await deleteEtapa(req.params.etapa_id);

  res.json(result[0]);
  res.end();
});

export default etapaRouter;
