import queryToDb from "../../shared/utils/queryToDb.js";

const getAmostrasAsCSV = async (protocolo_id) => {
  let sql = "SELECT * FROM amostra WHERE protocolo_id=" + protocolo_id;

  const response = await queryToDb(sql);

  if (response) {
    return convertJSONtoCSV(response);
  }

  return null;
};

export default getAmostrasAsCSV;

// Função que converte um objeto JSON em uma string CSV
export function convertJSONtoCSV(jsonData) {
  var csvData = [];
  var headerRow = Object.keys(jsonData[0]); // Cria a primeira linha do CSV com as chaves do objeto JSON
  csvData.push(headerRow.join(",")); // Adiciona a primeira linha ao array csvData
  jsonData.forEach(function (object) { // Itera sobre cada objeto do array jsonData
      var values = Object.values(object); // Cria um array com os valores do objeto
      csvData.push(values.join(",")); // Adiciona a linha com os valores ao array csvData
  });
  return csvData.join("\n"); // Retorna a string CSV
}