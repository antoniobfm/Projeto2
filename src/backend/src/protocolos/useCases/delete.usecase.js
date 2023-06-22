import queryToDb from "../../shared/utils/queryToDb.js";

const deleteProtocolo = async (protocolo_id) => {
  let sql =
    "DELETE FROM protocolo WHERE protocolo_id=" + protocolo_id + " RETURNING *";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default deleteProtocolo;
