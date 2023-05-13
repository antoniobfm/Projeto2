import queryToDb from "../../shared/utils/queryToDb.js";

const createProtocolo = async (data) => {
  let sql =
    "INSERT INTO PROTOCOLO (nome, foto_url, ativo) VALUES ('" +
    data.nome +
    "', '" +
    data.foto_url +
    "', " +
    data.ativo +
    ") RETURNING *";

    const response = await queryToDb(sql);

  if (response) {
    return response[0];
  }

  return null;
};

export default createProtocolo;
