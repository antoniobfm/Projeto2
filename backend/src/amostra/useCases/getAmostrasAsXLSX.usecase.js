import queryToDb from "../../shared/utils/queryToDb.js";
import XLSX from "json2xml";

const getAmostrasAsXLSX = async (protocolo_id) => {
  let sql = "SELECT * FROM amostra WHERE protocolo_id=" + protocolo_id;

  const response = await queryToDb(sql);

  if (response) {
    return response;
  }

  return null;
};

export default getAmostrasAsXLSX;

// Função para converter JSON em EXCEL
export function convertJsonToXLSX(jsonData) {
    const excel = XLSX(jsonData)
    return excel;
}