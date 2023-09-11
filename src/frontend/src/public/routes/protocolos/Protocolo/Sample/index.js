import ProtocoloStructureStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

class ProtocoloStructure extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["campo"];
  }

  // Variaveis
  campo = {}

  constructor() {
    super();

    // Cria um shadow root para o componente
    this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "campo") {
      this.campo = JSON.parse(this.getAttribute("campo"));

      this.render();
    }
  }

  // Renderiza o componente
  render() {
    // Cria um template para ser um container
    const template = document.createElement("template");

    // Se o campo existir, renderiza o componente
    if (this.campo && this.campo.nome) {

      // Define o conteúdo do template
      template.innerHTML = `
        <div class="structure-item">
            <h5 class="text-base font-bold">${this.campo.categoria}</h5>
          <h3 class="text-sm font-regular">${this.campo.nome}</h3>
        </div>
      `;
    }

    // Adiciona o template ao shadow root
    this.shadowRoot.innerHTML = template.innerHTML;
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, ProtocoloStructureStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-protocolo-sample", ProtocoloStructure);
