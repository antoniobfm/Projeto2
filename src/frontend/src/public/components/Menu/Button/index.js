import MenuButtonStyle from "./styles.js";
import AppStyle from "../../../styles.js";

class MenuButton extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["active-page", "label", "icon", "navigate-to", "page"];
  }

  // Variaveis
  label = ''
  icon = null
  navigate_to = null
  page = null
  activePage = null
  
  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label") {
      this.label = newValue;

      this.render();
    }

    if (name === "icon") {
      this.icon = newValue;
      
      this.render();
    }

    if (name === "navigate-to") {
      this.navigate_to = newValue;

      this.render();
    }

    if (name === "page") {
      this.page = newValue;

      this.render();
    }

    if (name === "active-page") {
      this.activePage = newValue;
    }
  }

  // Renderiza o componente
  render() {
    // Create a button element
    const button = document.createElement("button");
    button.classList.add("text-base", "font-bold", "text-gray-900");

    if (this.activePage === this.page) {
      button.classList.add("active");
    }

    // Adiciona o evento de click no botão para navegar para a rota definida no atributo "navigate-to"
    this.addNavigateTo(button);

    // Copia todos os atributos do elemento customizado para o botão
    // Exceto os atributos "label" e "icon"
    const attributes = this.attributes;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name !== "label" && attributes[i].name !== "icon") {
        button.setAttribute(attributes[i].name, attributes[i].value);
      }
    }

    // Cria um container para o conteúdo do botão
    const container = document.createElement("div");
    container.classList.add("button-container");

    // Cria um elemento SVG para o ícone
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "16");
    rect.setAttribute("height", "16");
    rect.setAttribute("fill", "#111827");

    svg.appendChild(rect);

    // Adiciona o SVG ao container
    container.appendChild(svg);

    // Cria um elemento span para o label
    const span = document.createElement("span");
    span.innerHTML = this.label;

    // Adiciona o span ao container
    container.appendChild(span);

    // Move o conteúdo do botão para o container
    while (this.firstChild) {
      container.appendChild(this.firstChild);
    }

    // Adiciona o container ao botão
    button.appendChild(container);

    this.shadowRoot.innerHTML = "";

    // Adiciona o botão ao shadow root
    this.shadowRoot.appendChild(button);
  }

  // Adiciona o event listener para navegar para a rota definida no atributo "navigate-to"
  addNavigateTo(button) {
    // Se o atributo "navigate-to" existir
    if (!!this.navigate_to) {
      // adiciona o evento de click no botão
      button.addEventListener("click", (e) => {
        document.querySelector("body").dispatchEvent(
          new CustomEvent("navigate-to", {
            detail: this.navigate_to,
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [MenuButtonStyle, AppStyle];
    }
  }
}

// Define the custom element
customElements.define("dendem-menu-button", MenuButton);
