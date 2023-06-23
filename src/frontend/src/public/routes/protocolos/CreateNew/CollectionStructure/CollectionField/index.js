import CollectionFieldStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class CollectionField extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["field-name", "field-type"];
  }

  // Variaveis
  field = {
    name: "",
    type: "",
  };

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido na DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
    this.addAllEventListeners();
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "field-name") {
      this.field.name = newValue;

      // Busca o input do nome do campo
      const input = this.shadowRoot.querySelector(".collection-field__input");

      // Atualiza o nome do campo
      if (input) input.value = newValue;
    }

    if (name === "field-type") {
      this.field.type = newValue;

      // Busca o select do tipo do campo
      const select = this.shadowRoot.querySelector(".collection-field__select");

      // Atualiza o tipo do campo
      if (select) select.value = newValue;
    }
  }

  // Renderiza o componente
  render() {
    // Cria um div para ser o container do componente
    const container = document.createElement("div");
    container.classList.add("collection-field");

    // Cria um div para ser o container do input e do select
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("collection-field__input-container");

    // Cria um input para o nome do campo
    const input = document.createElement("input");
    input.classList.add("collection-field__input");
    input.placeholder = "Nome do campo";
    input.value = this.field.name;
    input.type = "text";

    // Cria um select para o tipo do campo
    const select = document.createElement("select");
    select.classList.add("collection-field__select");

    // Cria um option element para o select
    const option = document.createElement("option");
    option.classList.add("collection-field__option");
    option.value = "text";
    option.innerText = "Resposta curta";

    // Cria um option element para o select
    const optionDescription = document.createElement("option");
    optionDescription.classList.add("collection-field__option");
    optionDescription.value = "long-text";
    optionDescription.innerText = "Resposta longa";

    // Cia um container para os botões de ação
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("collection-field__actions-container");

    // Cria um botão para deletar o campo
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("collection-field__delete-button");
    deleteButton.innerText = "DELETAR";

    // Adiciona o botão de ação deleteButton ao container de ações
    actionsContainer.appendChild(deleteButton);

    // Adiciona o container ao shadow root
    this.shadowRoot.appendChild(container);

    // Adiciona os elementos ao container
    container.appendChild(inputContainer);

    // Adiciona o input ao container de input
    inputContainer.appendChild(input);
    
    // Adiciona o select ao container
    inputContainer.appendChild(select);

    // Adiciona as opções de tipo de campo ao select
    select.innerHTML += option.outerHTML;
    select.innerHTML += optionDescription.outerHTML;

    // Adiciona o container de ações ao container
    container.appendChild(actionsContainer);
  }

  // Adiciona os event listeners
  addAllEventListeners() {
    // Busca o input do nome do campo
    const input = this.shadowRoot.querySelector(".collection-field__input");

    // Se o input existir
    if (input)
      // Adiciona um event listener para mudanças no valor do input
      input.addEventListener("change", (event) => {
        this.field.name = event.target.value;
        this.setAttribute("field-name", event.target.value);
        
        // Dispara um evento para notificar o componente pai que o nome do campo foi alterado
        // O componente pai é outro elemento customizado chamado CollectionStructure
        const fieldChangedEvent = new CustomEvent("field-name-changed", {
          detail: {
            fieldIndex: this.getAttribute("field-index"),
            fieldValue: event.target.value,
          },
          bubbles: true,
          composed: true,
        });

        this.dispatchEvent(fieldChangedEvent);
      });

    // Busca o select do tipo do campo
    const select = this.shadowRoot.querySelector(".collection-field__select");

    // Se o select existir
    if (select)
      // Adiciona um event listener para mudanças no valor do select
      select.addEventListener("change", (event) => {
        this.field.type = event.target.value;
        this.setAttribute("field-type", event.target.value);

        // Dispara um evento para notificar o componente pai que o tipo do campo foi alterado
        // O componente pai é outro elemento customizado chamado CollectionStructure
        const fieldChangedEvent = new CustomEvent("field-type-changed", {
          detail: {
            fieldIndex: this.getAttribute("field-index"),
            fieldValue: event.target.value,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(fieldChangedEvent);
      });

    // Busca o botão de deletar o campo
    const deleteButton = this.shadowRoot.querySelector(
      ".collection-field__delete-button"
    );

    // Se o botão de deletar existir
    if (deleteButton)
      // Adiciona um event listener para o botão de deletar o campo
      deleteButton.addEventListener("click", (event) => {
        // Dispara um evento para notificar o componente pai que o campo foi deletado
        // O componente pai é outro elemento customizado chamado CollectionStructure
        const fieldDeletedEvent = new CustomEvent("field-deleted", {
          detail: {
            fieldIndex: this.getAttribute("field-index"),
          },
          bubbles: true,
          composed: true,
        });

        this.dispatchEvent(fieldDeletedEvent);
      });
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [CollectionFieldStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-collection-field", CollectionField);
