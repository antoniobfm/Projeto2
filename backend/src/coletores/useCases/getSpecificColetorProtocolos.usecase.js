import queryToDb from "../../shared/utils/queryToDb.js";

const getSpecificColetorProtocolos = async (coletor_id) => {
    // Busca todos os protocolos que o coletor está
    let sqlProtocolosIn = "select p.* from COLETOR c INNER JOIN COLETOR_PROTOCOLO cp ON C.coletor_id = cp.coletor_id INNER JOIN PROTOCOLO p ON P.protocolo_id = cp.protocolo_id WHERE c.COLETOR_ID = " + coletor_id;

    // Busca todos os protocolos que o coletor não está
    let sqlProtocolosOut = "select p.* from PROTOCOLO p WHERE p.protocolo_id NOT IN (select cp.protocolo_id from COLETOR_PROTOCOLO cp WHERE cp.coletor_id = " + coletor_id + ")";

    const coletorIsIn = await queryToDb(sqlProtocolosIn);
    const coletorIsOut = await queryToDb(sqlProtocolosOut);

  if (coletorIsIn && coletorIsOut) {
    return {
        in: coletorIsIn,
        out: coletorIsOut
    }
  }

  return null;
};

export default getSpecificColetorProtocolos;
