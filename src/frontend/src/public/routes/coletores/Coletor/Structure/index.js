import ProtocoloStructureStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

class ColetorStructure extends HTMLElement {
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
  
  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "campo") {
      this.campo = JSON.parse(newValue);
    }
  }

  // Renderiza o componente
  render() {
    // Cria um template
    const template = document.createElement("template");

    // Se o coletor existir, define o conteúdo do template
    if (this.campo && this.campo.nome) {
      template.innerHTML = `
        <div class="structure-item">
            <h3>${this.campo.nome}</h3>
            <div class="tag">
              <h5 class="text-xs font-regular">${this.campo.categoria}</h5>
            </div>
            
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
customElements.define("dendem-coletor-structure", ColetorStructure);
