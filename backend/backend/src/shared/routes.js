import { Router } from "express";

import protocolosRouter from "../protocolos/protocolos.js";
import etapaRouter from "../etapa/etapa.js";
import coletorProtocoloRouter from "../coletor_protocolo/coletor_protocolo.js";
import camposRouter from "../campos/campos.js";
import amostraCampoRouter from "../amostra_campo/amostra_campo.js";
import amostraRouter from "../amostra/amostra.js";

/* Criação do roteador */
const routes = Router();

/* Rota raiz */
routes.use("/amostras", amostraRouter);
routes.use("/amostra_campo", amostraCampoRouter);
routes.use("/campos", camposRouter);
routes.use("/coletor_protocolo", coletorProtocoloRouter);
routes.use("/etapas", etapaRouter);
routes.use("/protocolos", protocolosRouter);

export default routes;
