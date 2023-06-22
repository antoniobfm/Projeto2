import queryToDb from "../../shared/utils/queryToDb.js";

const getAllCamposFromEtapa = async (etapa_id) => {
  let sql =
    "SELECT * FROM etapa LEFT JOIN campo ON campo.etapa_id = etapa.etapa_id WHERE etapa.etapa_id=" +
    etapa_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAllCamposFromEtapa;
