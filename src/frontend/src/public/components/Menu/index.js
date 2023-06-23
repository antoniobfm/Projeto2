import "./Button/index.js";
import MenuStyle from "./styles.js";
import AppStyles from "../../styles.js";

class CustomNav extends HTMLElement {
  constructor() {
    super();

    // Get the active page from the 'active-page' attribute
    this.activePage = this.getAttribute("active-page");

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    // this.loadScripts();
  }

  render() {
    // Create a nav element
    const nav = document.createElement("nav");

    // Copy the attributes from the original element
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

  loadScripts() {
    // If ListaItem script is not loaded, load it
    if (!this.shadow.querySelector("script")) {
      // Load dendem-menu-button component
      const scriptMenuButton = document.createElement("script");
      scriptMenuButton.src = "/components/Menu/Button/index.js";
      scriptMenuButton.type = "module";
      this.shadow.appendChild(scriptMenuButton);
    }
  }

  // Define the 'activePage' property
  get activePage() {
    return this.getAttribute("active-page");
  }

  set activePage(value) {
    this.setAttribute("active-page", value);
  }

  static get observedAttributes() {
    return ["active-page"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active-page" && oldValue !== newValue) {
      // Update the active page in the menu button
      const menuButton = this.shadow.querySelector("dendem-menu-button");
      menuButton.setAttribute("active-page", newValue);
    }
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [MenuStyle, AppStyles];
    }
  }
}

// Define the custom element
customElements.define("dendem-nav", CustomNav);
