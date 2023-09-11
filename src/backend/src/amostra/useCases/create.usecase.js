import queryToDb from "../../shared/utils/queryToDb.js";

const createAmostra = async (data) => {

  // Primeiro cria a amostra
  let sql =
    "INSERT INTO AMOSTRA (coletor_id, protocolo_id) VALUES (" +
    data.coletor_id +
    ", " +
    data.protocolo_id +
    ") RETURNING *";

  const response = await queryToDb(sql);

  console.log(response)

  // Depois cria os campos da amostra
  sql = "INSERT INTO AMOSTRA_CAMPO (amostra_id, campo_id, conteudo) VALUES (?, ?, ?)";
  console.log(response[0].amostra_id);
  data.campos.forEach(async (campo) => {
    await queryToDb(sql, [response[0].amostra_id, campo.campo_id, campo.conteudo]);
  });

  if (response) {
    return response;
  }

  return null;
};

export default createAmostra;
