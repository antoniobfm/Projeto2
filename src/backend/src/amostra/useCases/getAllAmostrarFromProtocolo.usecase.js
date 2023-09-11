import queryToDb from "../../shared/utils/queryToDb.js";

const getAllAmostrasFromProtocolo = async (protocolo_id) => {
  let sql = "SELECT * FROM AMOSTRA a INNER JOIN AMOSTRA_CAMPO ac ON a.amostra_id = ac.amostra_id INNER JOIN CAMPO c ON c.campo_id = ac.campo_id WHERE a.protocolo_id = " + protocolo_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAllAmostrasFromProtocolo;
