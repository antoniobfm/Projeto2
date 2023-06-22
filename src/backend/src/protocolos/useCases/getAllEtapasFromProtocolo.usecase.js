import queryToDb from "../../shared/utils/queryToDb.js";

const getAllEtapasFromProtocolo = async (protocolo_id) => {
  let etapas = "SELECT etapa_id FROM etapa WHERE protocolo_id=" + protocolo_id;
  let protocolo = "SELECT * FROM protocolo WHERE protocolo_id=" + protocolo_id;

  const etapas_response = await queryToDb(etapas);
  const protocolo_response = await queryToDb(protocolo);

  if (etapas_response && protocolo_response) {
    return {
      ...protocolo_response[0],
      etapas: etapas_response,
    };
  }

  return null;
};

export default getAllEtapasFromProtocolo;