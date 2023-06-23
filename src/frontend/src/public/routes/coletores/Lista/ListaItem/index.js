import ListaItemStyle from "./styles.js";

// Função para lidar com o evento de click em um coletor
function handleOnClick(e) {
  this.dispatchEvent(
    new CustomEvent("coletor-clicked", {
      detail: {
        coletor: this.getAttribute("coletor-id"),
      },
      bubbles: true,
      composed: true,
    })
  );
}

class ListaItem extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["name", "coletor-id"];
  }

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.addEventListenerToListaItem();
    this.loadStyles();
  }

  // Executa quando o elemento é removido do DOM
  disconnectedCallback() {
    const listaItem = this.shadowRoot.querySelector("button");
    
    if (listaItem)
      listaItem.removeEventListener("click", (e) => handleOnClick.bind(this)(e));
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this.name = newValue;

      // Busca o botão do protocolo
      const button = this.shadowRoot.querySelector("button");

      // Atualiza o nome do botão
      if (button)
        button.innerHTML = newValue;
    }

    if (name === "coletor-id") {
      this.coletor_id = newValue;

      // Busca o botão do protocolo
      const button = this.shadowRoot.querySelector("button");

      // Atualiza o nome do botão
      if (button)
        button.setAttribute("coletor-id", newValue);
    }
  }

  // Renderiza o componente
  render() {
    // Cria um botão para o protocolo
    const button = document.createElement("button");
    button.classList.add("lista-item");
    button.innerHTML = this.name;

    // Adiciona o botão ao shadow root
    this.shadowRoot.appendChild(button);
  }

  // Adiciona o event listener no item da lista de protocolos do coletor
  addEventListenerToListaItem() {
    // Busca a lista de protocolos
    const listaItem = this.shadowRoot.querySelector("button");

    if (!!listaItem) {
      // Adiciona o event listener para o evento de click em um protocolo da lista de coletores
      listaItem.addEventListener("click", (e) => handleOnClick.bind(this)(e));
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaItemStyle];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-coletor-lista-item", ListaItem);
