import ColetoresStyles from "./styles.js";
import AppStyles from '../../styles.js';

class Coletores extends HTMLElement {
  constructor() {
    super();
    this.selectedProtocol = null;
    this.sidebar = null;

    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.loadScripts();
  }

  render() {
    // Create a template element and append the div element to its content
    this.dashboard = document.createElement("div");
    this.dashboard.setAttribute("id", "dashboard");

    const navbar = '<dendem-nav active-page="coletores"></dendem-nav>';

    this.dashboard.innerHTML = navbar

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

      // Append Menu script to the page as module
      const scriptMenu = document.createElement("script");
      scriptMenu.src = "/components/Menu/index.js";
      scriptMenu.type = "module";
      this.appendChild(scriptMenu);

      console.log("Menu script loaded");
    }
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    this.render();

    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [ColetoresStyles, AppStyles];
    }
  }
}

const element = customElements.define("dendem-coletores", Coletores);

export default element;
