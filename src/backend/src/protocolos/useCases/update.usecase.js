import queryToDb from "../../shared/utils/queryToDb.js";

const updateProtocolo = async (protocolo_id, data) => {
  const sql =
    "UPDATE PROTOCOLO SET nome='" +
    data.nome +
    "', foto_url='" +
    data.foto_url +
    "' , ativo=" +
    data.ativo +
    " WHERE protocolo_id=" +
    protocolo_id +
    " RETURNING *";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default updateProtocolo;
