import ListaStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class MySection extends HTMLElement {
  constructor() {
    super();
    this.currentProtocolo = "ativos";
    this.protocolosAtivos = [];
    this.protocolosFinalizados = [];

    // Attach the shadow root to the custom element and append the template content to it
    // If host does not have shadow root, create one and append the template content to it
    this.attachShadow({ mode: "open" });

    // Render component
    this.render();
  }

  render() {
    // Create a container div element with the class "protocolos"
    this.container = document.createElement("div");
    this.container.classList.add("protocolos");

    // Create a div for the header, including h2 and buttonsDiv
    this.header = document.createElement("div");
    this.header.classList.add("header");
    this.container.appendChild(this.header);

    // Create an h2 element with the class "text-3xl" and text content "Protocolos"
    const h2 = document.createElement("h2");
    h2.classList.add("text-3xl");
    h2.textContent = "Protocolos";
    this.header.appendChild(h2);

    // Create a div element with the class "botoes"
    this.botoesDiv = document.createElement("div");
    this.botoesDiv.classList.add("botoes");
    this.header.appendChild(this.botoesDiv);

    // Create a ul element with the class "lista"
    this.listaUl = document.createElement("ul");
    this.listaUl.classList.add("lista");
    this.container.innerHTML += this.listaUl.outerHTML;

    // Create a template element and append the div element to its content
    const template = document.createElement("template");
    template.content.appendChild(this.container);

    // Remove previous rendered content
    const previousContent = this.shadowRoot.querySelector("div");

    if (!!previousContent) {
      previousContent.remove();
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.renderMenu();
    this.loadProtocolos();
    this.loadScripts();

    this.addEventListenerForProtocolCreated();
    this.addEventListenerForBotoes();
  }

  renderMenu() {
    const botoesDiv = this.shadowRoot.querySelector(".botoes");

    if (!!botoesDiv) {
      botoesDiv.remove();
    }

    if (this.botoesDiv) {
      this.botoesDiv.remove();
    }

    const newBotoesDiv = document.createElement("div");
    newBotoesDiv.classList.add("botoes");
    this.botoesDiv = newBotoesDiv;
    // Create a div element with the class "link" and "active", and text content "Ativos"
    const ativosDiv = document.createElement("div");

    ativosDiv.classList.add("link");
    // Give ativosDiv an shadow-id
    ativosDiv.setAttribute("shadow-id", "ativos");
    ativosDiv.textContent = "Ativos";
    ativosDiv.onclick = () => {
      console.log("ativosDiv");
      this.currentProtocolo = "ativos";
      this.renderMenu();
    };
    newBotoesDiv.appendChild(ativosDiv);

    // Create a div element with the class "link", and text content "Finalizados"
    const finalizadosDiv = document.createElement("div");
    finalizadosDiv.classList.add("link");
    // Give ativosDiv an shadow-id
    finalizadosDiv.setAttribute("shadow-id", "finalizados");
    finalizadosDiv.textContent = "Finalizados";
    finalizadosDiv.onclick = () => {
      console.log("finalizadosDiv");
      this.currentProtocolo = "finalizados";
      this.renderMenu();
    };
    newBotoesDiv.appendChild(finalizadosDiv);

    switch (this.currentProtocolo) {
      case "ativos":
        ativosDiv.classList.add("active");
        break;

      case "finalizados":
        finalizadosDiv.classList.add("active");
        break;
    }

    this.shadowRoot.querySelector(".header").appendChild(newBotoesDiv);
    this.changeTab();
  }

  changeTab() {
    // Populate the ul element with the class "lista" with the protocolos
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    if (!!listaUlShadow) {
      listaUlShadow.innerHTML = "";
    }

    if (!!this.listaUl) {
      this.listaUl.remove();
    }

    const newListaUl = document.createElement("ul");

    if (this.currentProtocolo === "ativos") {
      this.protocolosAtivos.forEach((protocolo) => {
        const listaItem = document.createElement("dendem-lista-item");

        // Send attribute to ListaItem component
        listaItem.setAttribute("name", protocolo.nome);
        listaItem.setAttribute("protocolo-id", protocolo.protocolo_id);

        newListaUl.appendChild(listaItem);
      });
    } else {
      this.protocolosFinalizados.forEach((protocolo) => {
        const listaItem = document.createElement("dendem-lista-item");

        // Send attribute to ListaItem component
        listaItem.setAttribute("name", protocolo.nome);
        listaItem.setAttribute("protocolo-id", protocolo.protocolo_id);

        newListaUl.appendChild(listaItem);
      });
    }

    this.shadowRoot.querySelector(".lista").innerHTML = newListaUl.innerHTML;
  }

  async loadProtocolos() {
    const response = await fetch("http://localhost:3334/protocolos").then(
      (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
    );

    this.protocolosAtivos = [];
    this.protocolosFinalizados = [];

    response.forEach((protocolo) => {
      if (!!protocolo.ativo) {
        this.protocolosAtivos.push(protocolo);
      } else {
        this.protocolosFinalizados.push(protocolo);
      }
    });

    this.changeTab();
  }

  addEventListenerForBotoes() {
    const ativosShadow = this.shadowRoot.querySelector('[shadow-id="ativos"]');
    ativosShadow &&
      ativosShadow.addEventListener("click", () => {
        console.log("ativosDiv");
        this.currentProtocolo = "ativos";
        this.renderMenu();
      });
    const finalizadosShadow = this.shadowRoot.querySelector(
      '[shadow-id="finalizados"]'
    );
    finalizadosShadow &&
      finalizadosShadow.addEventListener("click", () => {
        console.log("finalizadosDiv");
        this.currentProtocolo = "finalizados";
        this.renderMenu();
      });
  }

  // Add event listener for 'protocol-created' event
  addEventListenerForProtocolCreated() {
    console.log("addEventListenerForProtocolCreated");
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    if (!!listaUlShadow) {
      this.getRootNode().addEventListener("protocol-created", async () => {
        console.log("OAIKSMOIASDMFOISDAMKO");
        await this.loadProtocolos();
      });
    }
  }

  loadScripts() {
    // If ListaItem script is not loaded, load it
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "./routes/protocolos/Lista/ListaItem/index.js";
      script.type = "module";
      this.shadowRoot.appendChild(script);
    }
  }

  // Call the loadProtocolos function when the component is connected to the DOM
  connectedCallback() {
    this.render();
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaStyles, AppStyles];
    }
  }
}

customElements.define("dendem-lista", MySection);
