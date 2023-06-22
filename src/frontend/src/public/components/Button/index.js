import ButtonStyle from "./styles.js";

// Define o custom element "dendem-button"
class Button extends HTMLElement {
  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Renderiza o componente
  render() {
    // Cria um elemento button
    const button = document.createElement("button");
    button.classList.add("button");

    // Adiciona um event listener para o evento "navigate-to" no botão
    this.addNavigateTo(button);

    // Cria um label element e seta seu conteúdo para o atributo "label"
    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = this.getAttribute("label");

    // Cria um icon element e seta seu conteúdo para o atributo "icon"
    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.textContent = this.getAttribute("icon");

    // Busca o atributo "onClick" do botão
    const onClick = this.getAttribute("onClick");

    // Se o atributo existir, adiciona um event listener para o evento "click"
    if (onClick)
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.dispatchEvent(new Event("click"));
      });

    // Adiciona o label e o icon ao button
    button.appendChild(label);
    button.appendChild(icon);

    // Adiciona o botão ao shadow root
    this.shadowRoot.appendChild(button);
  }

  // Adiciona um event listener para o evento "navigate-to" no botão
  addNavigateTo(button) {
    // Busca o atributo "navigate-to" do botão
    const navigateToRoute = this.getAttribute("navigate-to");

    // Se o atributo existir, adiciona um event listener para o evento "navigate-to"
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

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ButtonStyle];
    }
  }
}

// Registra o custom element
customElements.define("dendem-button", Button);
