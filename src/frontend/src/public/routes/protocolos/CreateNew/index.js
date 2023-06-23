import CreateNewProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class CreateNewProtocolo extends HTMLElement {
  // Variaveis
  protocol = {
    generalInformation: {
      nome: "",
      descricao: "",
    },
    collectionStructure: [],
  };

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
    // Cria um elemento section para o container e define o id
    const container = document.createElement("section");
    container.id = "container";

    // Cria um elemento div para ser o container do titulo e descrição
    const superior = document.createElement("div");
    superior.id = "superior";

    // Cria um elemento div para ser o container do titulo
    const caixaTitulo = document.createElement("div");
    caixaTitulo.id = "caixa_titulo";

    // Cria um elemento h1 para ser o titulo, define o id e adiciona classes, e define o conteudo
    const titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.classList.add("text-3xl");
    titulo.classList.add("font-bold");
    titulo.textContent = "Criar novo protocolo";

    // Adiciona o titulo ao container
    caixaTitulo.appendChild(titulo);

    // Adiciona o container do titulo ao container superior
    superior.appendChild(caixaTitulo);

    // Cria um elemento div para ser o container da descrição
    const infor = document.createElement("div");
    infor.id = "infor";
    superior.appendChild(infor);

    // Cria um elemento p para ser a descrição, define o id e adiciona classes, e define o conteudo
    container.appendChild(superior);

    // Cria um elemento dendem-general-information para ser o container das informações gerais
    const generalInformation = document.createElement(
      "dendem-general-information"
    );

    // Cria um elemento dendem-collection-structure para ser o container da estrutura da coleção
    const collectionStructure = document.createElement(
      "dendem-collection-structure"
    );

    // Cria um elemento div para ser o container do botão de criar protocolo
    const createProtocol = `
      <div class="create-protocol-button-container">
        <dendem-button id="createProtocol" shadow-id="create-protocol-button" label="Criar protocolo"></dendem-button>
      </div>
    `;

    // Cria um template para o componente
    const template = document.createElement("template");
    template.content.appendChild(container);

    // Busca o conteudo anterior do shadow root
    const previousContent = this.shadow.querySelector("div");

    // Se tiver conteudo anterior, remove
    if (!!previousContent) {
      previousContent.remove();
    }

    // Adiciona o generalInformation, collectionStructure e createProtocol ao container
    container.appendChild(generalInformation);
    container.appendChild(collectionStructure);
    container.innerHTML += createProtocol;

    // Adiciona o template ao shadow root
    this.shadowRoot.innerHTML = template.innerHTML;
  }

  // Cria um novo protocolo
  async createProtocol(e) {
    // Envia requisição para o servidor
    fetch("http://localhost:3334/protocolos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Envia o protocolo como JSON na requisição
      body: JSON.stringify(this.protocol),
    })
      // Converte a resposta para JSON
      .then((response) => response.json())
      // Se a resposta for bem sucedida
      .then((data) => {
        // Dispara um evento para informar que o protocolo foi criado
        this.getRootNode().dispatchEvent(
          new CustomEvent("protocol-created", { bubbles: true, composed: true })
        );

        // Mostra um alerta de que o protocolo foi criado com sucesso
        alert("Protocolo criado com sucesso!");
      })
      // Se a resposta não for bem sucedida
      .catch((error) => {
        // Loga o erro no console
        console.error("Error:", error);
      });
  }

  // Adiciona todos event listeners
  addAllEventListeners() {
    // Adiciona um event listener para identifica quando a estrutura da coleção é alterada
    this.addEventListener("fields-updated", (e) => {
      this.protocol.collectionStructure = e.detail.fields;
    });

    // Adiciona um event listener para identificar quando o nome do protocolo é alterado
    this.addEventListener("protocol-name-changed", (e) => {
      this.protocol.generalInformation = e.detail.generalInformation;
    });

    // Adiciona um event listener para identificar quando a descrição do protocolo é alterada
    this.addEventListener("protocol-descricao-changed", (e) => {
      this.protocol.generalInformation = e.detail.generalInformation;
    });

    // Adiciona um event listener para identificar quando o botão de criar protocolo é clicado
    this.addEventListener("create-protocol-button-clicked", (e) => {
      this.createProtocol(e);
    });

    // Busca o botão de criar protocolo
    const createProtocolAddStuff =
      this.shadowRoot.getElementById("createProtocol");

    // Se o botão existir
    if (createProtocolAddStuff)
      // Adiciona um event listener para identificar quando o botão é clicado
      createProtocolAddStuff.addEventListener("click", (e) => {
        const formSubmit = new CustomEvent("create-protocol-button-clicked", {
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(formSubmit);
      });
  }

  // Carrega os scripts necessários para o componente
  loadScripts() {
    // Verifica se o script já foi carregado
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

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [AppStyles, CreateNewProtocoloStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-create-new-protocolo", CreateNewProtocolo);
