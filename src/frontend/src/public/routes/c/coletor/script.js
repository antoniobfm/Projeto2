import ColetorStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class Coletor extends HTMLElement {
  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.loadProtocolos();
  }

  // Renderiza o componente
  render() {
    // Cria um template e adiciona o conteúdo do componente
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    this.dashboard.innerHTML = /*html*/ `
        <section id="protocolos">
            <h2 class="text-lg">Protocolos</h2>
            <div class="protocolos-lista">
            </div>
        </section>

        <a href="https://wa.me/5531983448000" target="_blank">
          <div id="help">
              <span class="font-bold text-2xl">?<span>
          </div>
        </a>
    `;

    // Append the template content to the shadow root
    this.shadow.appendChild(this.dashboard);
  }

  // Renderiza os protocolos do coletor
  async loadProtocolos() {
    // Busca os protocolos do coletor
    const response = await fetch(`http://localhost:3334/coletor_protocolo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    })

    if (!response) {
        return
    }

    // Busca a section de protocolos
    const protocolos = this.shadow.querySelector("#protocolos .protocolos-lista");

    // Limpa a section de protocolos
    protocolos.innerHTML = "";

    // Renderiza os protocolos
    response.forEach((coletor_protocolo) => {
        const protocolo = document.createElement("div");
        protocolo.classList.add("protocolo");

        protocolo.innerHTML = /*html*/ `
            <div class="protocolo-info">
              <h3 class="text-base font-bold">${coletor_protocolo.nome}</h3>
            </div>
        `;

        // Adiciona o evento de click no protocolo
        protocolo.onclick = () => {
            document.dispatchEvent(
                new CustomEvent("navigate-to", {
                    detail: `/c/protocolo?id=${coletor_protocolo.protocolo_id}`,
                })
            );
        };

        // Adiciona a imagem do protocolo
        protocolo.style.backgroundImage = `url(http://localhost:3334/images/${coletor_protocolo.foto_url})`;

        protocolos.appendChild(protocolo);
    });
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ColetorStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
const element = customElements.define("dendem-coletor-home", Coletor);

export default element;
