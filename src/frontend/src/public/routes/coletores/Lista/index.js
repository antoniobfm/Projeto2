import ListaStyles from "./styles.js";
import AppStyles from "../../../styles.js";

// Função para lidar com o evento de quando um coletor é criado
function handleColetorCreated(e) {
  this.loadColetor();
}

class MySection extends HTMLElement {
  // Variaveis
  coletores = [];

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executado quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.loadScripts();
    this.addEventListenerForColetorCreated();
  }

  // Executado quando o elemento é removido do DOM
  disconnectedCallback() {

    // Busca o elemento ul com a classe "lista"
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Caso o elemento exista
    if (!!listaUlShadow) {
      // Remove o event listener para o evento "coletor-created"
      listaUlShadow.removeEventListener("coletor-created", (e) => handleColetorCreated.bind(this)(e));
    }
  }

  // Renderiza o componente
  render() {
    // Cria um container div com a classe "protocolos"
    const container = document.createElement("div");
    container.classList.add("protocolos");

    // Cria um div para o header, incluindo h2
    const header = document.createElement("div");
    header.classList.add("header");
    container.appendChild(header);

    // Cria um h2 com a classe "text-3xl" e o texto "Coletores" e o adiciona ao header
    const h2 = document.createElement("h2");
    h2.classList.add("text-3xl");
    h2.textContent = "Coletores";
    header.appendChild(h2);

    // Cria uma div com a classe "lista" e a adiciona ao container
    const listaUl = document.createElement("ul");
    listaUl.classList.add("lista");
    container.innerHTML += listaUl.outerHTML;

    // Cria um template e o popula com o container
    const template = document.createElement("template");
    template.content.appendChild(container);

    // Busca o conteúdo anterior
    const previousContent = this.shadowRoot.querySelector("div");

    // Caso exista, remove
    if (!!previousContent) {
      previousContent.remove();
    }

    // Adiciona o template ao shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Carrega os protocolos
    this.loadColetor();
  }

  // Atualiza a lista de coletores
  updateLista() {
    // Busca o elemento ul com a classe "lista"
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Caso o elemento exista, remove seu conteúdo
    if (!!listaUlShadow) {
      listaUlShadow.innerHTML = "";
    }

    // Cria um novo elemento ul
    const newListaUl = document.createElement("ul");

    // Para cada coletor
    this.coletores.forEach((item) => {
      // Cria um elemento ListaItem
      const listaItem = document.createElement("dendem-coletor-lista-item");

      // Define os atributos do elemento
      listaItem.setAttribute("name", item.nome);
      listaItem.setAttribute("coletor-id", item.coletor_id);

      // Adiciona o elemento ao novo elemento ul
      newListaUl.appendChild(listaItem);
    });

    // Define o innerHTML do elemento ul com a classe "lista" como o innerHTML do novo elemento ul
    this.shadowRoot.querySelector(".lista").innerHTML = newListaUl.innerHTML;
  }

  // Carrega os coletores
  async loadColetor() {
    // Busca os coletores
    const response = await fetch("http://localhost:3334/coletores").then(
      (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
    );

    // Limpa o array de coletores
    this.coletores = [];

    // Adiciona os coletores ao array de coletores
    response.forEach((protocolo) => {
      this.coletores.push(protocolo);
    });

    // Atualiza a lista de coletores na tela
    this.updateLista();
  }

  // Adiciona um event listener para o evento "coletor-created"
  addEventListenerForColetorCreated() {
    // Busca o elemento ul com a classe "lista"
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Caso o elemento não exista, retorna
    if (!listaUlShadow) return;

    // Adiciona um event listener para o evento "coletor-created"
    listaUlShadow.addEventListener("coletor-created", (e) => handleColetorCreated.bind(this)(e));
  }

  // Carrega os estilos
  loadStyles() {
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaStyles, AppStyles];
    }
  }

  // Carrega os scripts
  loadScripts() {
    // Se ainda não tiver sido carregado, carrega os scripts dos componentes
    if (!this.shadowRoot.querySelector("script")) {
      // Cria um script para o componente dendem-coletor-lista-item
      const script = document.createElement("script");
      script.src = "./routes/coletores/Lista/ListaItem/index.js";
      script.type = "module";
      
      // Adiciona o script ao shadow root
      this.shadowRoot.appendChild(script);
    }
  }
}
// Define o custom element na DOM
customElements.define("dendem-coletor-lista", MySection);
