import queryToDb from "../../shared/utils/queryToDb.js";

const getSpecificEtapa = async (etapa_id) => {
  let sql = "SELECT * FROM ETAPA WHERE etapa_id=" + etapa_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getSpecificEtapa;
