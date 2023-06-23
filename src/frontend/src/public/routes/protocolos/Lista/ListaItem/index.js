import ListaItemStyle from "./styles.js";

// Função para lidar com o evento de click em um protocolo
function handleOnClick(e) {

  // Dispara um evento para notificar o componente pai que um protocolo foi clicado/selecionado
  this.dispatchEvent(
    new CustomEvent("protocolo-clicked", {
      detail: {
        protocolo: this.protocolo_id,
      },
      bubbles: true,
      composed: true,
    })
  );
}

// Define a custom element called "Button"
class ListaItem extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["name", "protocolo-id"];
  }

  // Variáveis
  name = "";
  protocolo_id = "";

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
    }

    if (name === "protocolo-id") {
      this.protocolo_id = newValue;
    }
  }

  // Renderiza o componente
  render() {
    // Cria um elemento button
    const button = document.createElement("button");
    button.classList.add("lista-item");
    button.innerHTML = this.name;

    // Limpa o shadow root
    this.shadowRoot.innerHTML = "";

    // Adiciona o botão ao shadow root
    this.shadowRoot.appendChild(button);
  }

  // Adiciona o event listener no item da lista de protocolos
  addEventListenerToListaItem() {
    // Busca a lista de protocolos
    const listaItem = this.shadowRoot.querySelector("button");

    if (!!listaItem && !listaItem.onclick) {
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
customElements.define("dendem-lista-item", ListaItem);
