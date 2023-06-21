import queryToDb from "../../shared/utils/queryToDb.js";

const getAllCamposFromProtocolo = async (protocolo_id) => {
  let campos = "SELECT c.nome as campo_nome, c.categoria as campo_categoria, c.campo_id, e.etapa_id, p.nome as protocolo_nome, p.descricao as protocolo_descricao, p.protocolo_id, p.foto_url FROM CAMPO c INNER JOIN ETAPA e ON c.etapa_id = e.etapa_id INNER JOIN PROTOCOLO p ON e.protocolo_id = p.protocolo_id WHERE p.protocolo_id = " + protocolo_id;

  const campos_response = await queryToDb(campos);

  if (!campos_response || campos_response.length === 0) {
    return null;
  }

  // Format the response to be more readable

  // {
  //   campo_id: 51,
  //   etapa_id: 53,
  //   categoria: 'text',
  //   nome: 'Casca de João',
  //   protocolo_id: 62,
  //   foto_url: 'teste',
  //   ativo: 1,
  //   descricao: 'Tem gosto de LoL, Vox Machina e hotline miami'
  // },
  console.log(campos_response)
  const teste = campos_response.reduce((acc, campo) => {
    if (!acc[campo.etapa_id]) {
      acc[campo.etapa_id] = {
        etapa_id: campo.etapa_id,
        campos: [],
      };
    }

    acc[campo.etapa_id].campos.push({
      campo_id: campo.campo_id,
      nome: campo.campo_nome,
      categoria: campo.campo_categoria,
      descricao: campo.campo_descricao,
    });

    return acc;
  }, {});

  console.log(teste[campos_response[0].etapa_id])

  
  return {
    protocolo_id: campos_response[0].protocolo_id,
    nome: campos_response[0].protocolo_nome,
    descricao: campos_response[0].protocolo_descricao,
    foto_url: campos_response[0].foto_url,
    etapas: [teste[campos_response[0].etapa_id]],
  }
};

export default getAllCamposFromProtocolo;
