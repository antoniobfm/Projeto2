import ColetorProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

const stopRefresh = function (event) {
  event.preventDefault();
};

class ColetorProtocolo extends HTMLElement {
  // Variaveis
  protocolo_id = window.location.search.split("=")[1];
  protocolo = {};

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.loadProtocolo();
    this.addGoBackListener();
  }

  // Renderiza o componente
  render() {
    // Cria um template e adiciona o conteúdo do componente
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    this.dashboard.innerHTML = /*html*/ `
        <h1 class="text-2xl font-bold">${
          this.protocolo.nome || "Carregando ..."
        }</h1>
        <form id="campos" type="post">

          
        </form>

        <button id="goBack">
          Voltar
        </button>

        <a href="https://wa.me/5531983448000" target="_blank">
          <div id="help">
              <span class="font-bold text-2xl">?<span>
          </div>
        </a>
    `;

    // Append the template content to the shadow root
    this.shadow.appendChild(this.dashboard);
  }

  // Renderiza o protocolo e seus campos
  async loadProtocolo() {
    const response = await fetch(
      `http://localhost:3334/protocolos/${this.protocolo_id}/campos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    });

    if (!response) {
      return;
    }

    this.protocolo = response;

    // Busca o titulo do protocolo
    const titulo = this.shadow.querySelector("h1");
    titulo.innerHTML = this.protocolo.nome;

    // Busca a section da coleta
    const campos = this.shadow.querySelector("#campos");

    // Renderiza os campos
    this.protocolo.etapas.forEach((etapa) => {
      const etapa_html = document.createElement("div");
      etapa_html.setAttribute("class", "etapa");
      etapa_html.innerHTML = /*html*/ `
        <div class="campos-lista">
        </div>
      `;

      etapa.campos.forEach((campo) => {
        const campo_html = document.createElement("div");
        campo_html.setAttribute("class", "campo");

        campo_html.innerHTML = /*html*/ `
          <div class="campo">
            <label class="text-base font-bold">${campo.nome}</label>
            <input type="text" class="input" id="campo${campo.campo_id}" name="${campo.campo_id}" />
          </div>
          `;

        etapa_html.querySelector(".campos-lista").appendChild(campo_html);
      });

      campos.appendChild(etapa_html);
    });

    // Define o botão de salvar
    const salvar = `<button type="submit" class="text-regular font-bold save">SALVAR COLETA</button>`;

    // Adiciona o botão de salvar
    campos.innerHTML += salvar;

    this.addFormListener();
  }

  async addFormListener() {
    const form = this.shadow.querySelector("#campos");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const campos = [];

      this.protocolo.etapas.forEach((etapa) => {
        etapa.campos.forEach((campo) => {
          campos.push({
            campo_id: campo.campo_id,
            conteudo: this.shadow.querySelector(`#campo${campo.campo_id}`)
              .value,
          });
        });
      });

      console.log(campos);

      const response = await fetch(`http://localhost:3334/amostras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          protocolo_id: this.protocolo_id,
          campos: campos,
        }),
      }).then((response) => {
        return response.json();
      });

      if (!response) {
        return;
      }

      window.location.href = `http://localhost:3000/c/protocolo?protocolo_id=${this.protocolo_id}`;
    });
  }

  addGoBackListener() {
    const goBack = this.shadow.querySelector("#goBack");

    goBack.addEventListener("click", (event) => {
      event.preventDefault();

      // Dispara o evento de navegação
      document.dispatchEvent(
        new CustomEvent("navigate-to", {
          detail: '/c',
        })
      );
    });
  }


  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ColetorProtocoloStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
const element = customElements.define(
  "dendem-coletor-protocolo",
  ColetorProtocolo
);

export default element;
