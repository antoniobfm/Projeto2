import queryToDb from "../../shared/utils/queryToDb.js";

const createColetor = async (data) => {
  console.log(data)

  // Create a new coletor
  let sql =
    "INSERT INTO COLETOR (nome, email, senha) VALUES (?, ?, ?) RETURNING *";

  const query = await queryToDb(sql, [data.name, data.email, data.password]);

  const response = query;

  if (response) {
    return response[0];
  }

  return;
};

export default createColetor;
