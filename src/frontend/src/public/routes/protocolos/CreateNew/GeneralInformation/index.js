import GeneralInformationStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

// Função para lidar com o evento de mudança no nome do protocolo
function handleProtocoloNameChange(e) {
  // Define o valor do objeto generalInformation para o valor do input
  this.generalInformation.name = e.target.value;

  // Define o atributo protocol-name do elemento para o valor do input
  this.setAttribute("protocol-name", e.target.value);

  // Dispara um evento para notificar o componente pai que o campo nome mudou
  // O componente pai é outro elemento customizado chamado CollectionStructure
  const nameChangedEvent = new CustomEvent("protocol-name-changed", {
    detail: {
      generalInformation: this.generalInformation,
    },
    bubbles: true,
    composed: true,
  });

  this.dispatchEvent(nameChangedEvent);
}

// Função para lidar com o evento de mudança na descrição do protocolo
function handleProtocoloDescriptionChange(e) {
  // Define o valor do objeto generalInformation para o valor do input
  this.generalInformation.descricao = e.target.value;

  // Define o atributo protocol-descricao do elemento para o valor do input
  this.setAttribute("protocol-descricao", e.target.value);

  // Dispara um evento para notificar o componente pai que o campo descricao mudou
  // O componente pai é outro elemento customizado chamado CollectionStructure
  const descricaoChangedEvent = new CustomEvent(
    "protocol-descricao-changed",
    {
      detail: {
        generalInformation: this.generalInformation,
      },
      bubbles: true,
      composed: true,
    }
  );

  this.dispatchEvent(descricaoChangedEvent);
}

class GeneralInformation extends HTMLElement {
  // Variaveis
  generalInformation = {
    name: this.getAttribute("protocol-name") || "",
    descricao: this.getAttribute("protocol-descricao") || "",
  };

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.addAllEventListeners();
  }

  // Renderiza o componente
  render() {
    // Cria um elemento h2 para o titulo, adiciona suas classes e define seu conteudo
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Informações Gerais";

    // Cria um elemento dendem-input para o nome do protocolo
    const nameDendemInput = `<dendem-input id="input-nome" name="nome" label="Nome do protocolo" placeholder="" type="text"></dendem-input>`;

    // Cria um elemento dendem-input para a descricao do protocolo
    const descriptionDendemInput = `<dendem-input id="input-descricao" name="description" label="Descrição" placeholder="" type="text"></dendem-input>`;

    // Adiciona o titulo ao shadow root
    this.shadowRoot.appendChild(title);

    // Adiciona o input de nome ao shadow root
    this.shadowRoot.innerHTML += nameDendemInput;

    // Adiciona o input de descricao ao shadow root
    this.shadowRoot.innerHTML += descriptionDendemInput;
  }

  // Adiciona todos event listeners
  addAllEventListeners() {
    // Busca o input de nome de dentro do dendem-input
    const dendemInputNameInput = this.shadowRoot
      .getElementById("input-nome")
      .shadowRoot.querySelector("input");

    // Se o input de nome existir
    if (dendemInputNameInput)
      // Adiciona um event listener para mudanças no input protocol-name
      dendemInputNameInput.addEventListener("change", (e) => handleProtocoloNameChange.bind(this)(e))

    // Busca o input de descricao dentro do dendem-input
    const dendemInputdescricaoInput = this.shadowRoot
      .getElementById("input-descricao")
      .shadowRoot.querySelector("input");

    // Se o input de descricao existir
    if (dendemInputdescricaoInput)
      // Adiciona um event listener para mudanças no input protocol-descricao
      dendemInputdescricaoInput.addEventListener("change", (e) => handleProtocoloDescriptionChange.bind(this)(e));
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [
        GeneralInformationStyles,
        AppStyles,
      ];
    }
  }
}

// Register the custom element with the browser
customElements.define("dendem-general-information", GeneralInformation);
