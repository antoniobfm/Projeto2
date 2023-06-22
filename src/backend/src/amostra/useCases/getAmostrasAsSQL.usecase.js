import queryToDb from "../../shared/utils/queryToDb.js";

const getAmostrasAsSQL = async (protocolo_id) => {
  let sql = "SELECT * FROM amostra WHERE protocolo_id=" + protocolo_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAmostrasAsSQL;

// Função que converte um objeto JSON em uma string SQL para inserção no banco de dados
export function convertJsonToSQL(jsonData, tableName) {
  // Verifica se o JSON é um array, caso contrário, transforma em um array com um único elemento
  if (!Array.isArray(jsonData)) {
    jsonData = [jsonData];
  }
  // Retorna uma string vazia se o JSON estiver vazio
  if (jsonData.length === 0) {
    return '';
  }
  // Obtém as chaves do primeiro objeto do array
  const keys = Object.keys(jsonData[0]);
  // Mapeia os valores do JSON para um array de arrays de valores
  const values = jsonData.map(item => {
    return Object.values(item).map(value => {
      // Trata as aspas simples ('), substituindo-as por duas aspas simples ('') para evitar erros de sintaxe no SQL
      if (typeof value === 'string') {
        value = value.replace(/'/g, "''");
      }
      return `'${value}'`;
    });
  });
  // Cria a string SQL de inserção
  const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ${values.map(row => `(${row.join(', ')})`).join(', ')};`;

  return sql;
}