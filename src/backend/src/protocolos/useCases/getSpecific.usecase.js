import queryToDb from "../../shared/utils/queryToDb.js";

const getSpecificProtocolo = async (protocolo_id) => {
  let sql = "SELECT * FROM protocolo WHERE protocolo_id=" + protocolo_id;

  const response = await queryToDb(sql);

  if (response) {
    return response[0];
  }

  return null;
};

export default getSpecificProtocolo;
