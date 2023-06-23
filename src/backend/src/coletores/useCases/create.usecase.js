import queryToDb from "../../shared/utils/queryToDb.js";

const createColetor = async (data) => {
  // Cria um novo registro na tabela COLETOR
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
