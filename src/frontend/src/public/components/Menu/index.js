import "./Button/index.js";
import MenuStyle from "./styles.js";
import AppStyles from "../../styles.js";

class CustomNav extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["active-page"];
  }

  // Variaveis
  activePage = null;

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos definidos em observedAttribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active-page") {
      this.activePage = newValue;
      this.render();
    }
  }

  // Renderiza o componente
  render() {
    // Create a nav element
    const nav = document.createElement("nav");

    // Copia os atributos do elemento para o nav
    for (let i = 0; i < this.attributes.length; i++) {
      nav.setAttribute(this.attributes[i].name, this.attributes[i].value);
    }

    // Create a container for the logo and menu
    const container = document.createElement("div");
    container.classList.add("container");

    // Create a logo element
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = "<span>DENDEM</span>";
    logo.addEventListener("click", () => {
      navigateTo("/");
    });

    const logoSpan = logo.querySelector("span");
    logoSpan.classList.add("text-xl", "font-bold", "text-gray-900");

    // Create a menu element
    const menu = document.createElement("div");
    menu.classList.add("menu");
    menu.innerHTML = `<dendem-menu-button navigate-to="protocolos" label="Protocolos" icon="/assets/retangulo.svg" page="protocolos" active-page="${this.activePage}"></dendem-menu-button>`;
    menu.innerHTML += `<dendem-menu-button navigate-to="coletores" label="Coletores" icon="/assets/retangulo.svg" page="coletores" active-page="${this.activePage}"></dendem-menu-button>`;

    // Create a footer element
    const footer = document.createElement("div");
    footer.classList.add("footer");
    footer.innerHTML = "<button>Sair</button>";

    // Add button to footer
    const button = footer.querySelector("button");
    button.classList.add("text-base", "font-bold", "text-gray-900");

    // Add the logo, menu, and footer elements to the nav
    container.appendChild(logo);
    container.appendChild(menu);
    nav.appendChild(container);
    nav.appendChild(footer);

    // Add the nav element to the shadow root
    this.shadow.appendChild(nav);
  }

  // Carrega os scripts
  loadScripts() {
    // Se ainda não tiver sido carregado, carrega os scripts dos componentes
    if (!this.shadow.querySelector("script")) {
      const scriptMenuButton = document.createElement("script");
      scriptMenuButton.src = "/components/Menu/Button/index.js";
      scriptMenuButton.type = "module";
      this.shadow.appendChild(scriptMenuButton);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [MenuStyle, AppStyles];
    }
  }
  
}

// Define the custom element
customElements.define("dendem-nav", CustomNav);
