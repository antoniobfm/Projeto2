import CreateNewColetorStyles from "./styles.js";
import AppStyles from "../../../styles.js";

function handleCreateColetorButtonClicked(e) {
  console.log("create-coletor-button-clicked");
  const formSubmit = new CustomEvent("create-coletor-button-clicked", {
    bubbles: true,
    composed: true,
  });
  this.dispatchEvent(formSubmit);
}

class CreateNewColetor extends HTMLElement {
  // Variaveis
  coletor = {
    nome: "",
    email: "",
    senha: "",
  };

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
    this.addAllEventListeners();
  }

  // Renderiza o componente
  render() {
    // Cria um container para o componente
    const container = document.createElement("section");
    container.id = "container";

    // Cria uma div para o topo do componente
    const superior = document.createElement("div");
    superior.id = "superior";

    // Cria uma div para um container do titulo
    const caixaTitulo = document.createElement("div");
    caixaTitulo.id = "caixa_titulo";

    // Cria um titulo para o componente, adiciona suas classes e conteudo
    const titulo = document.createElement("h1");
    titulo.id = "titulo";
    titulo.classList.add("text-3xl");
    titulo.classList.add("font-bold");
    titulo.textContent = "Criar novo coletor";

    // Adiciona o titulo ao container do titulo
    caixaTitulo.appendChild(titulo);
    superior.appendChild(caixaTitulo);

    // Cria uma div para um container de informacoes
    const infor = document.createElement("div");
    infor.id = "infor";
    superior.appendChild(infor);

    // Adiciona o container do topo ao container principal
    container.appendChild(superior);

    // Cria o elemento dendem-coletor-general-information
    const generalInformation = document.createElement(
      "dendem-coletor-general-information"
    );

    // Cria uma div para o botao de criar coletor
    const createColetor = `
      <div class="create-coletor-button-container">
        <dendem-button id="createColetor" shadow-id="create-coletor-button" label="Criar coletor"></dendem-button>
      </div>
    `;

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
    container.innerHTML += createColetor;

    this.shadowRoot.innerHTML = template.innerHTML;
  }

  // Cria o coletor
  async createColetor(e) {
    // Faz uma requisição para com o metodo POST para a rota de coletores
    fetch("http://localhost:3334/coletores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Passa os dados do coletor para requisição
      body: JSON.stringify(this.coletor),
    })
      // Caso de sucesso, transforma a resposta em json
      .then((response) => response.json())
      // Então, lida com os dados retornados da API
      .then((data) => {
        console.log("Success:", data);

        // Dispara o evento de coletor criado
        this.getRootNode().dispatchEvent(
          new CustomEvent("coletor-created", { bubbles: true, composed: true })
        );

        // Dispara um aletar de sucesso
        alert("Coletor criado com sucesso!");
      })
      // Caso de erro
      .catch((error) => {
        // Loga no console
        console.error("Error:", error);
      });
  }

  // Adiciona todos os event listeners
  addAllEventListeners() {
    // Adiciona um event listener para detectar mudanças no input de nome do coletor
    this.addEventListener("coletor-name-changed", (e) => {
      this.coletor = e.detail.generalInformation;
      console.log(this.coletor);
    });

    // Adiciona um event listener para detectar mudanças no input de email do coletor
    this.addEventListener("coletor-email-changed", (e) => {
      this.coletor = e.detail.generalInformation;
    });

    // Adiciona um event listener para detectar mudanças no input de senha do coletor
    this.addEventListener("coletor-password-changed", (e) => {
      this.coletor = e.detail.generalInformation;
    });

    // Adiciona um event listener para detectar quando o botão de criar coletor for clicado
    this.addEventListener("create-coletor-button-clicked", (e) => {
      this.createColetor(e);
    });

    // Busca o botão de criar coletor
    const createColetorAddStuff =
      this.shadowRoot.getElementById("createColetor");

    // Caso o botão de criar coletor exista
    if (!!createColetorAddStuff) {
      console.log("createColetorAddStuff", createColetorAddStuff);
      // Adiciona um event listener para detectar quando o botão de criar coletor for clicado
      // E chama a função handleCreateColetorButtonClicked
      createColetorAddStuff.addEventListener("click", (e) =>
        handleCreateColetorButtonClicked.bind(this)(e)
      );
    }
  }

  // Carrega os scripts do componente
  loadScripts() {
    // Se não tiver os scripts, adiciona
    if (!this.shadow.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "./routes/coletores/CreateNew/GeneralInformation/index.js";
      script.type = "module";
      this.shadow.appendChild(script);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Se não tiver os estilos, adiciona
    if (!this.shadow.adoptedStyleSheets.length) {
      this.shadow.adoptedStyleSheets = [AppStyles, CreateNewColetorStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-create-new-coletor", CreateNewColetor);
