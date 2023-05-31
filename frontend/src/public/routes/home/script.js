// Load Form component
// Append Lista script to the page as module
const scriptForm = document.createElement('script');
scriptForm.src = '/routes/home/Form/script.js';
scriptForm.type = 'module';
document.body.appendChild(scriptForm);

// Get data from /formacoes/:usuario_id and load it to ul id #formacoes
async function loadFormacoes() {
  const response = await fetch("http://localhost:3334/protocolos/1");

  const formacoes = await response.json();

  const formacoesList = document.getElementById("formacoes");

  // Clean list first
  formacoesList.innerHTML = "";

  formacoes.forEach((formacao) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${formacao.nome}</h3>
      <p>${formacao.inicio} - ${formacao.fim}</p>
      <p>${formacao.descricao}</p>
    `;
    formacoesList.appendChild(li);
  });
}

loadFormacoes();

async function createFormacao() {
  const nome = document.getElementById("nome").value;
  const inicio = document.getElementById("inicio").value;
  const fim = document.getElementById("fim").value;
  const descricao = document.getElementById("descricao").value;
  const usuario_id = 1;

  const response = await fetch(
    `http://localhost:3334/formacoes/${usuario_id}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nome: nome,
        inicio: String(new Date(inicio).getTime()),
        fim: fim && String(new Date(fim).getTime()),
        descricao: descricao,
      }),
    }
  );
  const data = await response.json();
  console.log(data);

  loadFormacoes();
}