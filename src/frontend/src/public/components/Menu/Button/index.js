import MenuButtonStyle from "./styles.js";
import AppStyle from "../../../styles.js";

class MenuButton extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["active-page"];
  }
  
  constructor() {
    super();
    // Get the component's attributes
    this.label = this.getAttribute("label");
    this.icon = this.getAttribute("icon");

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.render();
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [MenuButtonStyle, AppStyle];
    }
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active-page") {
      if (newValue === this.getAttribute("page")) {
        this.shadow.querySelector("button").classList.add("active");
      } else {
        this.shadow.querySelector("button").classList.remove("active");
      }
    }
  }

  // Renderiza o componente
  render() {
    // Create a button element
    const button = document.createElement("button");
    button.classList.add("text-base", "font-bold", "text-gray-900");

    this.addNavigateTo(button);

    // Copy the attributes from the original button element
    const attributes = this.attributes;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name !== "label" && attributes[i].name !== "icon") {
        button.setAttribute(attributes[i].name, attributes[i].value);
      }
    }

    // Create a container for the button content
    const container = document.createElement("div");
    container.classList.add("button-container");

    // Create an SVG element for the icon
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

    // Add the SVG to the container
    container.appendChild(svg);

    // Create a span element for the label
    const span = document.createElement("span");
    span.innerHTML = this.label;

    // // Add the span to the container
    container.appendChild(span);

    // // Move the button content into the container
    while (this.firstChild) {
      container.appendChild(this.firstChild);
    }

    // // Add the container to the button
    button.appendChild(container);

    // Add the button to the shadow root
    this.shadow.appendChild(button);
  }

  loadScripts() {}

  addNavigateTo(button) {
    const navigateToRoute = this.getAttribute("navigate-to");
    if (!!navigateToRoute) {
      button.addEventListener("click", (e) => {
        document.querySelector("body").dispatchEvent(
          new CustomEvent("navigate-to", {
            detail: navigateToRoute,
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

}

// Define the custom element
customElements.define("dendem-menu-button", MenuButton);
