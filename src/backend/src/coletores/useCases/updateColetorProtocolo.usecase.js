import queryToDb from "../../shared/utils/queryToDb.js";

const updateColetorProtocolo = async (coletor_id, protocolo_id) => {
    let checkIfThereIs = "SELECT * FROM COLETOR_PROTOCOLO WHERE coletor_id = " + coletor_id + " AND protocolo_id = " + protocolo_id;

    const check = await queryToDb(checkIfThereIs); 

    let sql;

    if (check.length > 0) {
        sql = "DELETE FROM COLETOR_PROTOCOLO WHERE coletor_id = " + coletor_id + " AND protocolo_id = " + protocolo_id;
    } else {
        sql = "INSERT INTO COLETOR_PROTOCOLO (coletor_id, protocolo_id) VALUES (" + coletor_id + ", " + protocolo_id + ")";
    }

    const response = await queryToDb(sql);

    if (response) {
        return response;
    }

    return null;
};

export default updateColetorProtocolo;
