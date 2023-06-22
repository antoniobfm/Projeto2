import { Router } from "express";
import createCampo from "./useCases/create.usecase.js";
import getCampo from "./useCases/get.usecase.js";
import getAllCampos from "./useCases/getAll.usecase.js";
import updateCampo from "./useCases/update.usecase.js";
import deleteCampo from "./useCases/delete.usecase.js";

const campoRouter = Router();

// TABELA CAMPO
// Insere um registro (é o C do CRUD - Create)
campoRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createCampo(req.body);

  res.json(result);
  res.end();
});

// Retorna um registro especifico ou todos os registros (é o R do CRUD - Read)
campoRouter.get("/:campo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getCampo(req.params.campo_id);

  res.json(result);
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
campoRouter.get("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await getAllCampos();

  res.json(result);
  res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
campoRouter.put("/:campo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await updateCampo(req.params.campo_id, req.body);

  res.json(result);
  res.end();
});

// Exclui um registro (é o D do CRUD - Delete)
campoRouter.delete("/:campo_id", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await deleteCampo(req.params.campo_id);

  res.json(result);
  res.end();
});

export default campoRouter;
