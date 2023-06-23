import GeneralInformationStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

class GeneralInformation extends HTMLElement {
  // Variaveis
  generalInformation = {
    name: this.getAttribute("coletor-name") || "",
    email: this.getAttribute("coletor-email") || "",
    password: this.getAttribute("coletor-password") || "",
  };

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.addEventListenerToDendemInput();
    this.loadStyles();
  }

  // Renderiza o componente
  render() {
    // Cria um elemento para o titulo, adiciona suas classes e conteudo
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Informações Gerais";

    // Cria um dendem input element para o nome do coletor
    const nameDendemInput = `<dendem-input id="input-nome" name="nome" label="Nome" placeholder="" type="text"></dendem-input>`;

    // Cria um dendem input element para o email do coletor
    const emailDendemInput = `<dendem-input id="input-email" name="email" label="Email" placeholder="" type="email"></dendem-input>`;

    // Cria um dendem input element para o password do coletor
    const passwordDendemInput = `<dendem-input id="input-password" name="password" label="Senha" placeholder="" type="password"></dendem-input>`;

    // Adiciona os elementos ao shadow root
    this.shadowRoot.appendChild(title);
    this.shadowRoot.innerHTML += nameDendemInput;
    this.shadowRoot.innerHTML += emailDendemInput;
    this.shadowRoot.innerHTML += passwordDendemInput;
  }

  // Adiciona os event listeners
  addEventListenerToDendemInput() {
    // Busca o input dentro do dendem-input
    const dendemInputNameInput = this.shadowRoot
      .getElementById("input-nome")
      .shadowRoot.querySelector("input");

    // Adiciona um event listener para quando a tecla é solta no input de nome
    dendemInputNameInput.addEventListener("keyup", (event) => {
      this.generalInformation.name = event.target.value;
      this.setAttribute("coletor-name", event.target.value);

      // Dispatch an event to notify the parent component that the field's name has changed
      // The parent component is another custom element called CollectionStructure
      const nameChangedEvent = new CustomEvent("coletor-name-changed", {
        detail: {
          generalInformation: this.generalInformation,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(nameChangedEvent);
    });

    // Busca o input dentro do dendem-input
    const dendemInputDescricaoInput = this.shadowRoot
      .getElementById("input-email")
      .shadowRoot.querySelector("input");

    // Adiciona um event listener para quando a tecla é solta no input de email
    dendemInputDescricaoInput.addEventListener("keyup", (event) => {
      this.generalInformation.email = event.target.value;
      this.setAttribute("coletor-email", event.target.value);

      // Dispatch an event to notify the parent component that the field's email has changed
      // The parent component is another custom element called CollectionStructure
      const descricaoChangedEvent = new CustomEvent("coletor-email-changed", {
        detail: {
          generalInformation: this.generalInformation,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(descricaoChangedEvent);
    });

    // Busca o input dentro do dendem-input
    const dendemInputPasswordInput = this.shadowRoot
      .getElementById("input-password")
      .shadowRoot.querySelector("input");

    // Adiciona um event listener para quando a tecla é solta no input de senha
    dendemInputPasswordInput.addEventListener("keyup", (event) => {
      this.generalInformation.password = event.target.value;
      this.setAttribute("coletor-password", event.target.value);

      // Dispatch an event to notify the parent component that the field's password has changed
      // The parent component is another custom element called CollectionStructure
      const passwordChangedEvent = new CustomEvent("coletor-password-changed", {
        detail: {
          generalInformation: this.generalInformation,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(passwordChangedEvent);
    });
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

// Define o custom element na DOM
customElements.define("dendem-coletor-general-information", GeneralInformation);
