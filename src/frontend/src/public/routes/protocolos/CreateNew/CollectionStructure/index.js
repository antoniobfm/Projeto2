import CollectionStructureStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

class CollectionStructure extends HTMLElement {
  // Variaveis
  fields = [];

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.addAllEventListeners();
    this.loadScripts();
    this.loadStyles();
  }

  // Renderiza o componente
  render() {
    // Cria um elemento h2 para o título do componente e adiciona suas classes e conteúdo
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Estrutura da Coleta";

    // Cria um container para os campos da coleção e adiciona uma classe e um id
    this.collectionFieldsContainer = document.createElement("div");
    this.collectionFieldsContainer.id = "collectionFieldsContainer";
    this.collectionFieldsContainer.classList.add("collection-fields-container");

    // Cria um botão para adicionar um novo campo à coleção
    const addNewCollectionFieldButton = `
      <div id="addCollectionFieldButton">
        <img src="http://localhost:3000/assets/icons/add.svg" alt="Adicionar novo campo" />
        <span class="text-sm font-bold">Adicionar novo campo</span>
      </div>
    `;

    // Adiciona o elemento de título ao shadow DOM
    this.shadowRoot.appendChild(title);
    this.shadowRoot.appendChild(this.collectionFieldsContainer);
    this.shadowRoot.innerHTML += addNewCollectionFieldButton;

    // Adiciona um campo inicial à coleção
    this.addNewCollectionField();
  }

  // Lida com a mudança de um campo
  updateField(e, property) {
    // Pega os valores a partir do evento
    const fieldIndex = e.detail.fieldIndex;
    const fieldValue = e.detail.fieldValue;

    // Atualiza o campo no array de campos
    this.fields[fieldIndex][property] = fieldValue;

    // Dispara um evento sinalizando que os campos foram atualizados
    const fieldsUpdated = new CustomEvent("fields-updated", {
      detail: {
        fields: this.fields,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(fieldsUpdated);
  }

  // Deleta um campo específico
  deleteField(e) {
    // Pega o index do campo a ser deletado a partir do evento
    const fieldIndex = e.detail.fieldIndex;

    // Remove o campo do array de campos
    this.fields.splice(fieldIndex, 1);

    this.collectionFieldsContainer.innerHTML = "";

    // Recreate the collection fields
    //.Recria os campos da coleção
    this.fields.forEach((field, index) => {
      // Cria um elemento dendem-collection-field
      const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`;

      // Adiciona o elemento ao container de campos
      this.collectionFieldsContainer.innerHTML += collectionField;
    });

    // Busca o container de campos no shadow DOM
    const container = this.shadowRoot.getElementById(
      "collectionFieldsContainer"
    );

    // Limpao container de campos
    container.innerHTML = "";

    // Adiciona o container de campos ao container principal
    container.innerHTML = this.collectionFieldsContainer.innerHTML;
  }

  // Adiciona um novo campo à coleção
  addNewCollectionField() {
    // Adiciona um novo campo ao array de campos
    this.fields.push({
      name: "",
      type: "text",
    });

    // Limpa o container de campos
    this.collectionFieldsContainer.innerHTML = "";

    // Recria na tela os campos definidos no array de campos
    this.fields.forEach((field, index) => {
      // Cria um elemento dendem-collection-field
      const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`;

      // Adiciona o elemento ao container de campos
      this.collectionFieldsContainer.innerHTML += collectionField;
    });

    // Adiciona o container de campos ao shadow DOM
    const container = this.shadowRoot.getElementById(
      "collectionFieldsContainer"
    );

    // Limpa o container de campos
    container.innerHTML = "";

    // Adiciona o container de campos ao container principal
    container.innerHTML = this.collectionFieldsContainer.innerHTML;
  }

  // Adiciona todos event listeners
  addAllEventListeners() {
    // Busca o botão de adicionar um novo campo
    const addCollectionFieldButton = this.shadowRoot.querySelector(
      "#addCollectionFieldButton"
    );

    // Adiciona um event listener para identificar quando o botão de adicionar um novo campo for clicado
    addCollectionFieldButton.addEventListener("click", () => {
      this.addNewCollectionField();
    });

    // Adiciona um event listener para identificar quando o nome de um campo foi alterado
    this.addEventListener("field-name-changed", (e) => {
      this.updateField(e, "name");
    });

    // Adiciona um event listener para identificar quando o tipo de um campo foi alterado
    this.addEventListener("field-type-changed", (e) => {
      this.updateField(e, "type");
    });

    // Adiciona um event listener para identificar quando um campo deve ser deletado
    this.addEventListener("field-deleted", (e) => {
      this.deleteField(e);
    });
  }

  // Carrega os scripts necessários para o componente
  loadScripts() {
    // Se o script de GeneralInformation não estiver carregado, carregue-o
    if (!this.shadowRoot.querySelector("script")) {
      const collectionFieldScript = document.createElement("script");
      collectionFieldScript.src =
        "./routes/protocolos/CreateNew/CollectionStructure/CollectionField/index.js";
      collectionFieldScript.type = "module";

      this.shadowRoot.appendChild(collectionFieldScript);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [
        AppStyles,
        CollectionStructureStyles,
      ];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-collection-structure", CollectionStructure);
