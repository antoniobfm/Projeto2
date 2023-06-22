import queryToDb from "../../shared/utils/queryToDb.js";

const createEtapa = async (data) => {
  let sql =
    "INSERT INTO ETAPA (protocolo_id) VALUES (" +
    data.protocolo_id +
    ") RETURNING *";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default createEtapa;