import queryToDb from "../../shared/utils/queryToDb.js";

const updateAmostra = async (data, amostra_id) => {
  let sql =
    "UPDATE AMOSTRA SET coletor_id =" +
    data.coletor_id +
    ", protocolo_id = " +
    data.protocolo_id +
    " WHERE amostra_id=" +
    amostra_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default updateAmostra;
