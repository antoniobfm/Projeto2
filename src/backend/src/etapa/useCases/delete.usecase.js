import queryToDb from "../../shared/utils/queryToDb.js";

const deleteEtapa = async (etapa_id) => {
  let sql = "DELETE FROM ETAPA WHERE etapa_id=" + etapa_id + " RETURNING *";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default deleteEtapa;
