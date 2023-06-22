import queryToDb from "../../shared/utils/queryToDb.js";

const getAllColetores = async () => {
  let sql = "SELECT * FROM COLETOR ORDER BY coletor_id DESC";

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAllColetores;
