import queryToDb from "../../shared/utils/queryToDb.js";

const createAmostra = async (data) => {
  let sql =
    "INSERT INTO AMOSTRA (coletor_id, protocolo_id) VALUES (" +
    data.coletor_id +
    ", " +
    data.protocolo_id +
    ") RETURNING *";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default createAmostra;
