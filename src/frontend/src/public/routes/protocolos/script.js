import ProtocolosStyle from "./styles.js";

class Protocolos extends HTMLElement {
  // Variaveis
  selectedProtocol = null;
  sidebar = null;

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.addAllEventListeners();
    this.loadStyles();
  }

  // Renderiza o componente
  render() {
    // Create a template element and append the div element to its content
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    // Define o componente dendem-protocolo, que mostra os detalhes de um protocolo
    const protocolo = `<dendem-protocolo protocolo-id='${this.selectedProtocol}'></dendem-protocolo>`;

    // Define o componente dendem-nav, que é a navbar da aplicação
    const navbar = '<dendem-nav active-page="protocolos"></dendem-nav>';

    // Define o componente dendem-lista, que lista todos os protocolos
    const lista = "<dendem-lista></dendem-lista>";

    // Define o componente dendem-create-new-protocolo, que cria um novo protocolo
    const createNew =
      "<dendem-create-new-protocolo></dendem-create-new-protocolo>";

    // Define o componente dendem-export-samples, que exporta amostras de um protocolo
    const exportSamples = `<dendem-export-samples title="Export Samples" protocolo-id="${this.selectedProtocol}"></dendem-export-samples>`;

    // Checa se o protocolo selecionado é diferente de null
    if (this.selectedProtocol) {
      // Adiciona o componente dendem-protocolo ao dashboard
      this.dashboard.innerHTML = protocolo;
    } else {
      // Se não, mostra a lista de protocolos e o componente para criar um novo protocolo
      this.dashboard.innerHTML = navbar + lista + createNew;
    }

    // Adiciona o dashboard ao shadow root
    this.shadow.appendChild(this.dashboard);
  }

  // Carrega um protocolo no dashboard
  loadProtocolos(procotoloId) {
    // Volta o sidebar para null
    this.sidebar = null;

    // Checa se o componente já está carregado
    if (this.shadow.querySelector("dendem-protocolo")) {
      // Remove o componente
      this.shadow.querySelector("dendem-protocolo").remove();

      // Checa se o componente de exportar amostras está carregado
      if (this.shadow.querySelector("dendem-export-samples")) {

        // Remove o componente de exportar amostras
        this.shadow.querySelector("dendem-export-samples").remove();
      }
    } else {
      // Remove dendem-create-new-protocolo, o dendem-protocolo vai ocupar o lugar dele
      this.shadow.querySelector("dendem-create-new-protocolo").remove();
    }

    // Criar um novo componente dendem-protocolo
    const protocolo = document.createElement("dendem-protocolo");

    // Seta o atributo protocolo-id
    protocolo.setAttribute("protocolo-id", procotoloId);

    // Adiciona o dendem-protocolo ao dashboard
    this.dashboard.appendChild(protocolo);
  }

  // Adiciona o componente de exportar amostras ao dashboard
  loadExportSamples() {
    // Define o componente dendem-export-samples
    const exportSamples = `<dendem-export-samples title="Exportar Amostras" protocolo-id="${this.selectedProtocol}"></dendem-export-samples>`;

    // Adiciona o componente de exportar amostras ao dashboard
    this.dashboard.innerHTML += exportSamples;
  }

  // Adiciona todos os event listeners
  addAllEventListeners() {
    // Adiciona o event listener para saber quando um protocolo foi selecionado
    this.addEventListener("protocolo-clicked", (e) => {
      // Seta o protocolo selecionado
      this.selectedProtocol = e.detail.protocolo;

      // Carrega o protocolo no dashboard
      this.loadProtocolos(this.selectedProtocol);
    });

    // Adiciona o event listener para saber quando o botão de exportar amostras foi clicado
    this.addEventListener("export-clicked", (e) => {

      // Se o sidebar não for export já, carrega o componente de exportar amostras
      if (this.sidebar !== "export") {
        this.loadExportSamples();
      }

      // Seta o sidebar para export
      this.sidebar = "export";
    });
  }

  // Importa os scripts necessários para o componente
  loadScripts() {
    // Se eles não estiverem carregados
    if (!this.shadow.querySelector("script")) {
      // Importa o script de exportar amostras
      const script = document.createElement("script");
      script.src = "/routes/protocolos/ExportSamples/index.js";
      script.type = "module";
      this.appendChild(script);

      // Importa o componente dendem-nav
      const scriptMenu = document.createElement("script");
      scriptMenu.src = "/components/Menu/index.js";
      scriptMenu.type = "module";
      this.appendChild(scriptMenu);

      // Importa o componente dendem-protocolo
      const scriptProtocolos = document.createElement("script");
      scriptProtocolos.src = "/routes/protocolos/Protocolo/index.js";
      scriptProtocolos.type = "module";
      this.appendChild(scriptProtocolos);

      // Importa o componente dendem-lista
      const scriptCreateNew = document.createElement("script");
      scriptCreateNew.src = "/routes/protocolos/CreateNew/index.js";
      scriptCreateNew.type = "module";
      this.appendChild(scriptCreateNew);

      // Importa o componente dendem-lista
      const scriptLista = document.createElement("script");
      scriptLista.src = "/routes/protocolos/Lista/index.js";
      scriptLista.type = "module";
      this.appendChild(scriptLista);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ProtocolosStyle];
    }
  }
}

// Define o custom element na DOM
const element = customElements.define("dendem-protocolos", Protocolos);

export default element;
