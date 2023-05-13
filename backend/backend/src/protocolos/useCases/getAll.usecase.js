import queryToDb from "../../shared/utils/queryToDb.js";

const getAllProtocolos = async () => {
  let sql = "SELECT * FROM protocolo";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAllProtocolos;
