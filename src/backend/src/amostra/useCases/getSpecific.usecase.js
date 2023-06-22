import queryToDb from "../../shared/utils/queryToDb.js";

const getSpecificAmostra = async (amostra_id) => {
  let sql = "SELECT * FROM amostra WHERE amostra_id=" + amostra_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getSpecificAmostra;
