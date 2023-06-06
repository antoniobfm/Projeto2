class MySection extends HTMLElement {
  constructor() {
    super();
    this.currentProtocolo = "ativos";
    this.protocolosAtivos = [];
    this.protocolosFinalizados = []
    
    // Render component
    this.loadProtocolos();
  }

  render() {
    // Get from url query string the protocolo id
    const urlParams = new URLSearchParams(window.location.search);
    const protocoloId = urlParams.get("protocoloId");

    // Create a div element with the class "protocolos"
    const div = document.createElement("div");
    div.classList.add("protocolos");

    // Create an h2 element with the class "text-3xl" and text content "Protocolos"
    const h2 = document.createElement("h2");
    h2.classList.add("text-3xl");
    h2.textContent = "Protocolos";
    div.appendChild(h2);

    // Create a div element with the class "botoes"
    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("botoes");
    div.appendChild(botoesDiv);

    // Create a div element with the class "link" and "active", and text content "Ativos"
    const ativosDiv = document.createElement("div");

    ativosDiv.classList.add("link");
    // Give ativosDiv an shadow-id
    ativosDiv.setAttribute("shadow-id", "ativos");
    ativosDiv.textContent = "Ativos";
    botoesDiv.appendChild(ativosDiv);

    // Create a div element with the class "link", and text content "Finalizados"
    const finalizadosDiv = document.createElement("div");
    finalizadosDiv.classList.add("link");
    // Give ativosDiv an shadow-id
    finalizadosDiv.setAttribute("shadow-id", "finalizados");
    finalizadosDiv.textContent = "Finalizados";
    botoesDiv.appendChild(finalizadosDiv);

    // Create a ul element with the class "lista"
    const listaUl = document.createElement("ul");
    listaUl.classList.add("lista");
    div.appendChild(listaUl);

    switch (this.currentProtocolo) {
      case "ativos":
        ativosDiv.classList.add("active");
        break;

      case "finalizados":
        finalizadosDiv.classList.add("active");
        break;
    };

    // Create a template element and append the div element to its content
    const template = document.createElement("template");
    template.content.appendChild(div);

    // Attach the shadow root to the custom element and append the template content to it
    // If host does not have shadow root, create one and append the template content to it
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    };

    // Remove previous rendered content
    const previousContent = this.shadowRoot.querySelector("div");

    if (!!previousContent) {
      previousContent.remove();
    };

    // If ListaItem script is not loaded, load it
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "./routes/protocolos/Lista/ListaItem/index.js";
      script.type = "module";
      this.shadowRoot.appendChild(script);
    };

    // If there isn't a style tag in the shadow root, create one and append the template content to it
    if (!this.shadowRoot.querySelector("link")) {
      // Load the component's CSS file by creating a link element with the href attribute set to the CSS file path and appending it to the shadow root
      const styles = document.createElement("link");
      styles.rel = "stylesheet";
      styles.href = "./routes/protocolos/Lista/styles.css";
      this.shadowRoot.appendChild(styles);
    };

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Select by shadow-id the ativos div and add an event listener to it
    const ativosShadow = this.shadowRoot.querySelector('[shadow-id="ativos"]');

    // If ativosShadow is not null and there is no event listener attached to it, add one
    if (!!ativosShadow && !ativosShadow.onclick) {
      ativosShadow.addEventListener("click", () => {
        this.currentProtocolo = "ativos";

        // Reload component with the new currentProtocolo
        this.connectedCallback();
      });
    };

    // Select by shadow-id the finalizados div and add an event listener to it
    const finalizadosShadow = this.shadowRoot.querySelector(
      '[shadow-id="finalizados"]'
    );

    if (!!finalizadosShadow && !finalizadosShadow.onclick) {
      finalizadosShadow.addEventListener("click", () => {
        this.currentProtocolo = "finalizados";
        
        // Reload component with the new currentProtocolo
        this.connectedCallback();
      }
      );
    }

    // Populate the ul element with the class "lista" with the protocolos
    const listaUlShadow = this.shadowRoot.querySelector(".lista");
    
    if (!!listaUlShadow) {
      listaUlShadow.innerHTML = "";
    }

    if (this.currentProtocolo === "ativos") {
    this.protocolosAtivos.forEach((protocolo) => {
      const listaItem = document.createElement("dendem-lista-item");

      // Send attribute to ListaItem component
      listaItem.setAttribute("name", protocolo.nome);

      listaUlShadow.appendChild(listaItem);
    }
    );
  } else {
    this.protocolosFinalizados.forEach((protocolo) => {
      const listaItem = document.createElement("dendem-lista-item");

      // Send attribute to ListaItem component
      listaItem.setAttribute("name", protocolo.nome)

      listaUlShadow.appendChild(listaItem);
    }
    );
  }
  }

  async loadProtocolos() {
    const response = await fetch("http://localhost:3334/protocolos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      response.forEach((protocolo) => {
        if (!!protocolo.ativo) {
          this.protocolosAtivos.push(protocolo);
        } else {
          this.protocolosFinalizados.push(protocolo);
        }
      });

      this.render();
  }

  // Call the loadProtocolos function when the component is connected to the DOM
  connectedCallback() {
    this.render();
  }
}

customElements.define("dendem-lista", MySection);
