import ProtocolosStyle from "./styles.js";

class Protocolos extends HTMLElement {
  constructor() {
    super();
    this.selectedProtocol = null;
    this.sidebar = null;

    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.loadScripts();

    // Listen to protocolo-clicked event
    this.addEventListener("protocolo-clicked", (e) => {
      console.log("protocolo-clicked event received");
      this.selectedProtocol = e.detail.protocolo;

      // Substitute
      this.loadProtocolos(this.selectedProtocol);
    });

    this.addEventListener("export-clicked", (e) => {

      if (this.sidebar !== 'export' ) {
        this.loadExportSamples();
      }
      
      this.sidebar = "export";
    });
  }

  render() {
    console.log('render protocolos')
    // Create a template element and append the div element to its content
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    const protocolo = `<dendem-protocolo protocolo-id='${this.selectedProtocol}'></dendem-protocolo>`;

    const navbar = '<dendem-nav active-page="protocolos"></dendem-nav>';

    const lista = "<dendem-lista></dendem-lista>";

    const createNew =
      "<dendem-create-new-protocolo></dendem-create-new-protocolo>";

    const exportSamples =
      '<dendem-export-samples title="Export Samples"></dendem-export-samples>';

    if (this.selectedProtocol) {
      this.dashboard.innerHTML = protocolo;

      if (this.sidebar) {
        if (this.sidebar === "export") {
          this.dashboard.innerHTML += exportSamples;
        }
      }
    } else {
      this.dashboard.innerHTML = navbar + lista + createNew;
    }

    // Append the template content to the shadow root
    this.shadow.appendChild(this.dashboard);
  }

  loadProtocolos(procotoloId) {
    this.sidebar = null;
    
    // Check if the component is already loaded
    if (this.shadow.querySelector("dendem-protocolo")) {
      // Remove the component
      this.shadow.querySelector("dendem-protocolo").remove();

      if (this.shadow.querySelector("dendem-export-samples")) {
        this.shadow.querySelector("dendem-export-samples").remove();
      }
    } else {
      // Remove dendem-create-new-protocolo
      this.shadow.querySelector("dendem-create-new-protocolo").remove();
    }

    // Create a new dendem-protocolo component
    const protocolo = document.createElement("dendem-protocolo");

    // Set the protocolo-id attribute
    protocolo.setAttribute("protocolo-id", procotoloId);

    // const protocolo = `<dendem-protocolo protocolo-id='${procotoloId}'></dendem-protocolo>`;

    this.dashboard.appendChild(protocolo);
  }

  loadExportSamples() {
    const exportSamples = `<dendem-export-samples title="Exportar Amostras"></dendem-export-samples>`;

    this.dashboard.innerHTML += exportSamples;
  }

  loadScripts() {
    if (!this.shadow.querySelector("script")) {
      // Append ExportSamples script to the page as module
      const script = document.createElement("script");
      script.src = "/routes/protocolos/ExportSamples/index.js";
      script.type = "module";
      this.appendChild(script);

      console.log("ExportSamples script loaded");

      // Append Menu script to the page as module
      const scriptMenu = document.createElement("script");
      scriptMenu.src = "/components/Menu/index.js";
      scriptMenu.type = "module";
      this.appendChild(scriptMenu);

      console.log("Menu script loaded");

      // Append Protocolos script to the page as module
      const scriptProtocolos = document.createElement("script");
      scriptProtocolos.src = "/routes/protocolos/Protocolo/index.js";
      scriptProtocolos.type = "module";
      this.appendChild(scriptProtocolos);

      // Append Create New script to the page as module
      const scriptCreateNew = document.createElement("script");
      scriptCreateNew.src = "/routes/protocolos/CreateNew/index.js";
      scriptCreateNew.type = "module";
      this.appendChild(scriptCreateNew);

      // Append Lista script to the page as module
      const scriptLista = document.createElement("script");
      scriptLista.src = "/routes/protocolos/Lista/index.js";
      scriptLista.type = "module";
      this.appendChild(scriptLista);
    }
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    this.render();

    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ProtocolosStyle];
    }
  }
}

const element = customElements.define("dendem-protocolos", Protocolos);

export default element;
