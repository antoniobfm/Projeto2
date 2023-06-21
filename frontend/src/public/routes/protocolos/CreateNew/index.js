import CreateNewProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class CreateNewProtocolo extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.protocol = {
      generalInformation: {
        nome: "",
        descricao: "",
      },
      collectionStructure: [],
    };

    // Receive an event from dendem-collection-structure this.dispatchEvent(new Event('fields-updated'));
    this.addEventListener("fields-updated", (e) => {
      this.fieldsUpdated(e);
    });

    // Receive an event from dendem-general-information this.dispatchEvent(new Event('protocol-name-changed'));
    this.addEventListener("protocol-name-changed", (e) => {
      this.generalInformationUpdated(e);
    });

    // Receive an event from dendem-general-information this.dispatchEvent(new Event('protocol-name-changed'));
    this.addEventListener("protocol-descricao-changed", (e) => {
      this.generalInformationUpdated(e);
    });

    // Receive an event from dendem-general-information this.dispatchEvent(new Event('create-protocol-button-clicked'));
    this.addEventListener("create-protocol-button-clicked", (e) => {
      this.createProtocol(e);
    });
  }

  // Create the basic structure of HTML elements to display a "Create New Protocol" heading in a section of the page
  render() {
    console.log("render create-new-protocolo")
    const container = document.createElement("section");
    container.id = "container";

    const superior = document.createElement("div");
    superior.id = "superior";

    const caixaTitulo = document.createElement("div");
    caixaTitulo.id = "caixa_titulo";

    const titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.classList.add("text-3xl");
    titulo.classList.add("font-bold");
    titulo.textContent = "Criar novo protocolo";

    caixaTitulo.appendChild(titulo);
    superior.appendChild(caixaTitulo);

    const infor = document.createElement("div");
    infor.id = "infor";
    superior.appendChild(infor);

    container.appendChild(superior);

    // Load GeneralInformation component
    const generalInformation = document.createElement(
      "dendem-general-information"
    );
    const collectionStructure = document.createElement(
      "dendem-collection-structure"
    );

    // Create a button to add a create the protocol
    const createProtocol = `
      <div class="create-protocol-button-container">
        <dendem-button id="createProtocol" shadow-id="create-protocol-button" label="Criar protocolo"></dendem-button>
      </div>
    `;

    // Import
    // Create a template element and append the div element to its content
    const template = document.createElement("template");
    template.content.appendChild(container);

    // Remove previous rendered content
    const previousContent = this.shadow.querySelector("div");

    if (!!previousContent) {
      previousContent.remove();
    }

    // Append generalInformation to the container
    container.appendChild(generalInformation);
    container.appendChild(collectionStructure);
    container.innerHTML += createProtocol;

    this.shadowRoot.innerHTML = template.innerHTML;

    const createProtocolAddStuff = this.shadowRoot.getElementById("createProtocol")
    console.log(createProtocolAddStuff)
    createProtocolAddStuff && createProtocolAddStuff.addEventListener('click', (e) => {
      const fieldChangedEvent = new CustomEvent("create-protocol-button-clicked", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(fieldChangedEvent);

    })

    this.loadScripts();
  }

  // Send an HTTP POST request to create a new protocol on the server
  async createProtocol(e) {
    console.log("create-protocol-button-clicked");
    console.log(this.protocol);

    fetch("http://localhost:3334/protocolos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.protocol),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        this.getRootNode().dispatchEvent(
          new CustomEvent("protocol-created", { bubbles: true, composed: true })
        );

        alert("Protocolo criado com sucesso!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  fieldsUpdated(e) {
    this.protocol.collectionStructure = e.detail.fields;

    console.log("fields-updated");
    console.log(this.protocol);
  }

  generalInformationUpdated(e) {
    this.protocol.generalInformation = e.detail.generalInformation;

    console.log("general-information-updated");
    console.log(this.protocol);
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    this.render();

    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [AppStyles, CreateNewProtocoloStyles];
    }
  }

  loadScripts() {
    // If GeneralInformation script is not loaded, load it
    if (!this.shadow.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "./routes/protocolos/CreateNew/GeneralInformation/index.js";
      script.type = "module";
      this.shadow.appendChild(script);

      const collectionStructureScript = document.createElement("script");
      collectionStructureScript.src =
        "./routes/protocolos/CreateNew/CollectionStructure/index.js";
      collectionStructureScript.type = "module";

      this.shadow.appendChild(collectionStructureScript);
      this.shadow.appendChild(script);
    }
  }
}

customElements.define("dendem-create-new-protocolo", CreateNewProtocolo);
