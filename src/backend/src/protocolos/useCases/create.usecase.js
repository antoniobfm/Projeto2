import queryToDb from "../../shared/utils/queryToDb.js";

const createProtocolo = async (data) => {
  let protocolo = {
    id: null,
    nome: data.generalInformation.name,
    foto_url: null,
    ativo: 1,
    etapas: [
      {
        id: null,
        protocolo_id: null,
        campos: [],
      },
    ],
  };

  // Create a new protocolo
  let sql =
    "INSERT INTO PROTOCOLO (nome, descricao, foto_url, ativo) VALUES ('" +
    data.generalInformation.name +
    "', '" +
    data.generalInformation.descricao +
    "', '" +
    'teste' +
    "', " +
    1 +
    ") RETURNING *";

  const query = await queryToDb(sql);

  const response = query;

  protocolo.id = response[0].protocolo_id;
  protocolo.foto_url = response[0].foto_url;
  protocolo.ativo = response[0].ativo;

  // Create a new etapa
  sql =
    "INSERT INTO ETAPA (protocolo_id) VALUES (" +
    response[0].protocolo_id +
    ") RETURNING *";

  const query2 = await queryToDb(sql);

  const response2 = query2;

  protocolo.etapas[0].id = response2[0].etapa_id;
  protocolo.etapas[0].protocolo_id = response2[0].protocolo_id;

  // Create campos for the etapa
  data.collectionStructure.forEach(async (field) => {
    sql =
      "INSERT INTO CAMPO (etapa_id, nome, categoria) VALUES (" +
      response2[0].etapa_id +
      ", '" +
      field.name +
      "', '" +
      field.type +
      "') RETURNING *";

    const query3 = await queryToDb(sql);

    const response3 = query3;

    protocolo.etapas[0].campos.push({
      id: response3[0].campo_id,
      etapa_id: response3[0].etapa_id,
      nome: response3[0].nome,
      categoria: response3[0].categoria,
    });
  });

  if (response) {
    return response[0];
  }

  return protocolo;
};

export default createProtocolo;
