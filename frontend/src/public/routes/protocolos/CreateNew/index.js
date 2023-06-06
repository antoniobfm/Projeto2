class MySection extends HTMLElement {
    constructor() {
      super();
      
      this.protocol = {
        generalInformation: {
          nome: "",
        },
        collectionStructure: [],
      }
  
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
      this.loadStyles();

      // Append generalInformation to the container
      container.appendChild(generalInformation);
      container.appendChild(collectionStructure);

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Receive an event from dendem-collection-structure this.dispatchEvent(new Event('fields-updated'));
      this.addEventListener('fields-updated', (e) => {
        this.fieldsUpdated(e);
      });

      // Receive an event from dendem-general-information this.dispatchEvent(new Event('protocol-name-changed'));
      this.addEventListener('protocol-name-changed', (e) => {
        this.generalInformationUpdated(e);
      });

      // Receive an event from dendem-general-information this.dispatchEvent(new Event('create-protocol-button-clicked'));
      this.addEventListener('create-protocol-button-clicked', (e) => {
        this.createProtocol(e);
      });
    }

    createProtocol(e) {
      console.log('create-protocol-button-clicked');
      console.log(this.protocol);

      fetch('http://localhost:3334/protocolos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.protocol),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Protocolo criado com sucesso!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    fieldsUpdated(e) {
      this.protocol.collectionStructure = e.detail.fields;

      console.log('fields-updated');
      console.log(this.protocol);
    }

    generalInformationUpdated(e) {
      this.protocol.generalInformation = e.detail.generalInformation;

      console.log('general-information-updated');
      console.log(this.protocol);
    }

    loadStyles() {
      if (!this.shadowRoot.querySelector("link")) {
        // Load the root app component's CSS file
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = "./routes/protocolos/CreateNew/styles.css";
        this.shadowRoot.appendChild(styles);
      };
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