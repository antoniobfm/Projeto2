import ListaItemStyle from "./styles.js";

// Lida com o evento de click no item da lista
function handleOnClick(e) {
  // Dispara um evento para o host quando o item da lista é clicado
  this.dispatchEvent(
    new CustomEvent("coletor-protocolo-clicked", {
      detail: {
        protocolo_id: this.protocoloId,
        is_in: this.isIn,
      },
      bubbles: true,
      composed: true,
    })
  );
}

// Define um custom element chamado "ListaItem"
class ListaItem extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["name", "is-in", "protocolo-id"];
  }

  // Variáveis de instância
  name = "";
  isIn = "";
  protocoloId = "";

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o componente é adicionado ao DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.addEventListenerToListaItem();
  }

  // Executa quando o componente é removido do DOM
  disconnectedCallback() {
    // Busca o componente na DOM
    const listaItem = this.shadowRoot.querySelector("button");

    // Se o componente existir, remove o event listener
    if (!!listaItem) {
      listaItem.removeEventListener("click", (e) => handleOnClick.bind(this)(e));
    }
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "protocolo-id") {
      this.protocoloId = newValue;
    }

    if (name === "name") {
      this.name = newValue;

      const button = this.shadowRoot.querySelector("button");

      if (button)
        button.innerHTML = newValue;
    }

    if (name === "is-in") {
      this.isIn = newValue;
      const button = this.shadowRoot.querySelector("button");
      const text = newValue === "dentro" ? " (DENTRO)" : "";
      if (button)
        button.innerHTML += text;
    }
  }

  // Renderiza o componente
  render() {
    // Define o texto que demonstra se o coletor está dentro do protocolo
    const text = this.isIn === "dentro" ? " (dentro)" : "";

    // Cria um elemento button e define seu conteúdo
    const button = document.createElement("button");
    button.classList.add("lista-item");
    button.innerHTML = this.name;
    button.innerHTML += text;

    // Adiciona o componente ao shadow root
    this.shadowRoot.appendChild(button);
  }

  // Adiciona event listeners ao componente
  addEventListenerToListaItem() {
    // Verifica se o componente existe
    const listaItem = this.shadowRoot.querySelector("button");

    // Adiciona um event listener ao componente
    if (!!listaItem) {
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
customElements.define("dendem-coletor-lista-protocolos-item", ListaItem);
