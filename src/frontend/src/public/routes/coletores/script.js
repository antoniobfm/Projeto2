import ColetoresStyle from "./styles.js";
import AppStyles from "../../styles.js";

// Função para lidar com o evento de click em um coletor
function handleColetorClicked(e) {
  this.selectedColetor = e.detail.coletor;

  // Carrega o coletor selecionado
  this.loadColetor(this.selectedColetor);
}

class Coletores extends HTMLElement {
  // Variaveis
  selectedColetor = null;

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.loadStyles();
    this.addEventListenerForColetorClicked();
  }

  // Executa quando o elemento é removido do DOM
  disconnectedCallback() {
    this.removeEventListener("coletor-clicked", (e) =>
      handleColetorClicked.bind(this)(e)
    );
  }

  // Renderiza o componente
  render() {
    // Cria um template e adiciona o conteúdo do componente
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    const coletor = `<dendem-coletor coletor-id='${this.selectedColetor}'></dendem-coletor>`;

    const navbar = "<dendem-nav active-page='coletores'></dendem-nav>";

    const lista = "<dendem-coletor-lista></dendem-coletor-lista>";

    const listaColetorProtocolos =
      "<dendem-coletor-lista-protocolos></dendem-coletor-lista-protocolos>";

    const createNew = "<dendem-create-new-coletor></dendem-create-new-coletor>";

    this.dashboard.innerHTML = navbar + lista + createNew;

    if (this.selectedColetor) {
      this.dashboard.innerHTML = +coletor + listaColetorProtocolos;
    } else {
      this.dashboard.innerHTML = navbar + lista + createNew;
    }

    // Append the template content to the shadow root
    this.shadow.appendChild(this.dashboard);
  }

  // Renderiza o componente
  loadColetor(coletorId) {
    // Remove dendem-create-new-coletor caso exista
    if (this.shadow.querySelector("dendem-create-new-coletor")) {
      this.shadow.querySelector("dendem-create-new-coletor").remove();
    }

    // Busca o dendem-coletor
    let coletor = this.shadow.querySelector("dendem-coletor");

    // Se não existir, cria um
    if (!coletor) {
      coletor = document.createElement("dendem-coletor");
      this.dashboard.appendChild(coletor);
    }

    // Busca o dendem-coletor-lista-protocolos
    let listaColetorProtocolos = this.shadow.querySelector(
      "dendem-coletor-lista-protocolos"
    );

    // Se não existir, cria um
    if (!listaColetorProtocolos) {
      listaColetorProtocolos = document.createElement(
        "dendem-coletor-lista-protocolos"
      );
      this.dashboard.appendChild(listaColetorProtocolos);
    }

    // Seta o coletor-id no dendem-coletor-lista-protocolos
    listaColetorProtocolos.setAttribute("coletor-id", coletorId);
    
    // Seta o coletor-id no dendem-coletor
    coletor.setAttribute("coletor-id", coletorId);
  }

  // Adiciona um listener para o evento coletor-clicked
  addEventListenerForColetorClicked() {
    this.addEventListener("coletor-clicked", (e) =>
      handleColetorClicked.bind(this)(e)
    );
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ColetoresStyle, AppStyles];
    }
  }

  // Carrega os scripts do componente
  loadScripts() {
    if (!this.shadow.querySelector("script")) {
      // Importa o script do componente Menu
      const scriptMenu = document.createElement("script");
      scriptMenu.src = "/components/Menu/index.js";
      scriptMenu.type = "module";
      this.appendChild(scriptMenu);

      // Importa o script do componente Nav
      const scriptLista = document.createElement("script");
      scriptLista.src = "/routes/coletores/Lista/index.js";
      scriptLista.type = "module";
      this.appendChild(scriptLista);

      // Importa o script do componente CreateNew
      const scriptCreateNew = document.createElement("script");
      scriptCreateNew.src = "/routes/coletores/CreateNew/index.js";
      scriptCreateNew.type = "module";
      this.appendChild(scriptCreateNew);

      // Importa o script do componente Coletor
      const scriptColetor = document.createElement("script");
      scriptColetor.src = "/routes/coletores/Coletor/index.js";
      scriptColetor.type = "module";
      this.appendChild(scriptColetor);

      // Importa o script do componente Coletor Lista Protocolos
      const scriptColetorProtocolos = document.createElement("script");
      scriptColetorProtocolos.src =
        "/routes/coletores/ListaColetorProtocolos/index.js";
      scriptColetorProtocolos.type = "module";
      this.appendChild(scriptColetorProtocolos);
    }
  }
}

// Define o custom element na DOM
const element = customElements.define("dendem-coletores", Coletores);

export default element;
