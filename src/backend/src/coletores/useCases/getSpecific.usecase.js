import queryToDb from "../../shared/utils/queryToDb.js";

const getSpecificColetor = async (coletor_id) => {
  let sql = "SELECT * FROM COLETOR WHERE coletor_id=" + coletor_id;

  const response = await queryToDb(sql);

  if (response) {
    return response[0];
  }

  return null;
};

export default getSpecificColetor;
