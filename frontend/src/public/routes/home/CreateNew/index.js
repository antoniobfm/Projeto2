class MySection extends HTMLElement {
    constructor() {
      super();
  
      const container = document.createElement("section");
      container.id = "container";

      const superior = document.createElement("div");
      superior.id = "superior";

      const caixaTitulo = document.createElement("div");
      caixaTitulo.id = "caixa_titulo";

      const titulo = document.createElement("h1");
      titulo.id = "titulo";
      titulo.classList.add("text-4xl");
      titulo.textContent = "Criar novo";

      caixaTitulo.appendChild(titulo);
      superior.appendChild(caixaTitulo);

      const infor = document.createElement("div");
      infor.id = "infor";
      superior.appendChild(infor);

      container.appendChild(superior);

      // Load GeneralInformation component
      const generalInformation = document.createElement("dendem-general-information");
      const collectionStructure = document.createElement("dendem-collection-structure");

      // Import 
      // Create a template element and append the div element to its content
      const template = document.createElement("template");
      template.content.appendChild(container);

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
      

      this.loadScripts();

      // If there isn't a style tag in the shadow root, create one and append the template content to it
      if (!this.shadowRoot.querySelector("link")) {
        // Load the component's CSS file by creating a link element with the href attribute set to the CSS file path and appending it to the shadow root
        const styles = document.createElement("link");
        styles.rel = "stylesheet";
        styles.href = "./routes/protocolos/CreateNew/styles.css";
        this.shadowRoot.appendChild(styles);
      };

      // Append generalInformation to the container
      container.appendChild(generalInformation);
      container.appendChild(collectionStructure);

      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    loadScripts() {
      // If GeneralInformation script is not loaded, load it
      if (!this.shadowRoot.querySelector("script")) {
        const script = document.createElement("script");
        script.src = "./routes/protocolos/CreateNew/GeneralInformation/index.js";
        script.type = "module";
        this.shadowRoot.appendChild(script);

        const collectionStructureScript = document.createElement("script");
        collectionStructureScript.src = "./routes/protocolos/CreateNew/CollectionStructure/index.js";
        collectionStructureScript.type = "module";
        
        this.shadowRoot.appendChild(collectionStructureScript);
        this.shadowRoot.appendChild(script);
      };
    }
  }
  
  customElements.define("dendem-create-new-protocolo", MySection);