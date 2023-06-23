import ListaStyles from "./styles.js";
import AppStyles from "../../../styles.js";

// Função para lidar com o evento de click em um protocolo, para adicionar ou remover o protocolo da lista de protocolos do coletor
function handleColetorProtocoloClicked(e) {
  this.toggleProtocolo(e.detail.protocolo_id, e.detail.is_in);
}

class ColetorListaProtocolos extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["coletor-id"];
  }

  // Variaveis
  coletor_id = "";
  coletoresProtocolos = [];

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.addEventListenerForProtocoloToggle();
    this.loadStyles();
  }

  // Executado quando o elemento é removido do DOM
  disconnectedCallback() {
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Remove o event listener para o evento de click em um protocolo da lista de protocolos do coletor
    if (!!listaUlShadow)
      this.removeEventListener("coletor-protocolo-clicked", (e) =>
        handleColetorProtocoloClicked.bind(this)(e)
      );
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "coletor-id") {
      this.coletor_id = newValue;

      // Renderiza o componente novamente
      this.render();
    }
  }

  // Renderiza o componente
  render() {
    // Cria um div com a classe "protocolos"
    const container = document.createElement("div");
    container.classList.add("protocolos");

    // Cria um div para o header, que vai conter o h2
    const header = document.createElement("div");
    header.classList.add("header");
    container.appendChild(header);

    // Cria um h2 com a classe "text-3xl" e o texto "Protocolos" e o adiciona ao header
    const h2 = document.createElement("h2");
    h2.classList.add("text-3xl");
    h2.textContent = "Protocolos";
    header.appendChild(h2);

    // Cria uma ul com a classe "lista" e a adiciona ao container
    const listaUl = document.createElement("ul");
    listaUl.classList.add("lista");
    container.innerHTML += listaUl.outerHTML;

    // Cria um template e adiciona o container a ele
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

    // Atualiza a lista de protocolos
    this.loadColectorProtocols();
  }

  // Atualiza a lista de protocolos
  updateList() {
    // Busca a ul
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Caso exista, remove
    if (!!listaUlShadow) {
      listaUlShadow.innerHTML = "";
    }

    // Cria uma ul com a classe "lista"
    const newListaUl = document.createElement("ul");

    // Para cada protocolo, cria um item de lista e o adiciona a ul
    this.coletoresProtocolos.in &&
      this.coletoresProtocolos.in.forEach((item) => {
        const listaItem = document.createElement(
          "dendem-coletor-lista-protocolos-item"
        );

        // Atribui os atributos ao item de lista
        listaItem.setAttribute("name", item.nome);
        listaItem.setAttribute("is-in", "dentro");
        listaItem.setAttribute("protocolo-id", item.protocolo_id);

        // Adiciona o item de lista a ul
        newListaUl.appendChild(listaItem);
      });

    // Para cada protocolo, cria um item de lista e o adiciona a ul
    this.coletoresProtocolos.out &&
      this.coletoresProtocolos.out.forEach((item) => {
        // Cria um item de lista
        const listaItem = document.createElement(
          "dendem-coletor-lista-protocolos-item"
        );

        // Atribui os atributos ao item de lista
        listaItem.setAttribute("name", item.nome);
        listaItem.setAttribute("is-in", "");
        listaItem.setAttribute("protocolo-id", item.protocolo_id);

        // Adiciona o item de lista a ul
        newListaUl.appendChild(listaItem);
      });

    // Substitui a ul antiga pela nova
    this.shadowRoot.querySelector(".lista").innerHTML = newListaUl.innerHTML;
  }

  // Busca os protocolos do coletor
  async loadColectorProtocols() {
    // Se não houver um coletor selecionado, não faz nada
    if (!this.coletor_id) return;

    // Busca os protocolos do coletor
    const response = await fetch(
      "http://localhost:3334/coletores/protocolos/" + this.coletor_id
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

    // Define os protocolos do coletor como um array vazio
    this.coletoresProtocolos = [];

    // Define os protocolos do coletor como a resposta da requisição
    this.coletoresProtocolos = {
      in: response.in,
      out: response.out,
    };

    // Renderiza a lista de protocolos
    this.updateList();
  }

  // Atualiza os protocolos do coletor, adicionando ou removendo um protocolo dos quais ele faz partes
  async toggleProtocolo(protocolo_id, is_in) {
    // Se não houver um coletor selecionado, não faz nada
    if (!this.coletor_id) return;

    await fetch(
      "http://localhost:3334/coletores/protocolos/" +
        this.coletor_id +
        "/" +
        protocolo_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_in: is_in,
        }),
      }
    );

    // Atualiza a lista de protocolos
    this.loadColectorProtocols();
  }

  // adiciona um listener para o evento de click no protocolo
  addEventListenerForProtocoloToggle() {
    // Busca a lista de protocolos
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Se a lista de protocolos existir, adiciona o listener
    if (!!listaUlShadow) {
      this.addEventListener("coletor-protocolo-clicked", (e) =>
        handleColetorProtocoloClicked.bind(this)(e)
      );
    }
  }

  // Carrega os scripts do componente
  loadScripts() {
    // Se não tiver os scripts, adiciona
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "./routes/coletores/ListaColetorProtocolos/ListaItem/index.js";
      script.type = "module";
      this.shadowRoot.appendChild(script);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define(
  "dendem-coletor-lista-protocolos",
  ColetorListaProtocolos
);
