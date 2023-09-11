import queryToDb from "../../shared/utils/queryToDb.js";

const getAllFromSpecificColetor = async (coletor_id) => {
  let sql = "select p.* from COLETOR c INNER JOIN COLETOR_PROTOCOLO cp ON C.coletor_id = cp.coletor_id INNER JOIN PROTOCOLO p ON P.protocolo_id = cp.protocolo_id WHERE c.COLETOR_ID = " + coletor_id;

  const response = await queryToDb(sql);

  console.log(response);

  if (response) {
    return response;
  }

  return null;
};

export default getAllFromSpecificColetor;
