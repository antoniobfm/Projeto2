import CollectionStructureStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

// Define a custom element called "Button"
class CollectionStructure extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    this.fields = [];

    // Create a shadow DOM for the element
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a tile element
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Estrutura da Coleta";

    // Create a element to hold the collection fields
    this.collectionFieldsContainer = document.createElement("div");
    this.collectionFieldsContainer.id = "collectionFieldsContainer";
    this.collectionFieldsContainer.classList.add("collection-fields-container");

    // Create a button to add a new collection field
    // const addNewCollectionFieldButton = `<dendem-button id="addCollectionFieldButton" shadow-id="add-collection-field" label="Adicionar novo campo"></dendem-button>`;
    const addNewCollectionFieldButton = `
      <div id="addCollectionFieldButton">
        <img src="http://localhost:3000/assets/icons/add.svg" alt="Adicionar novo campo" />
        <span class="text-sm font-bold">Adicionar novo campo</span>
      </div>
    `

    // Add the title element to the shadow DOM
    this.shadowRoot.appendChild(title);
    this.shadowRoot.appendChild(this.collectionFieldsContainer);
    this.shadowRoot.innerHTML += addNewCollectionFieldButton;

    this.addNewCollectionField();

    // Add event listener to dendem-button using shadow-id
    const addCollectionFieldButton = this.shadowRoot.querySelector(
      "#addCollectionFieldButton"
    );

    addCollectionFieldButton.addEventListener("click", () => {
      this.addNewCollectionField();
    });

    this.loadScripts();
  }

  // Define the attributes to observe
  static get observedAttributes() {
    return ["name"];
  }

  // Handle changes to an attribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      const button = this.shadowRoot.querySelector("button");
      button.innerHTML = newValue;
    }
  }

  updateField(e, property) {
    const fieldIndex = e.detail.fieldIndex;
    const fieldValue = e.detail.fieldValue;

    this.fields[fieldIndex][property] = fieldValue;

    const fieldsUpdated = new CustomEvent("fields-updated", {
      detail: {
        fields: this.fields,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(fieldsUpdated);
  }

  deleteField(e) {
    console.log("okokoko");

    const fieldIndex = e.detail.fieldIndex;

    this.fields.splice(fieldIndex, 1);

    this.collectionFieldsContainer.innerHTML = "";

    // Recreate the collection fields
    this.fields.forEach((field, index) => {
      // Create a dendem input element
      const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`;
      console.log("collectionField", collectionField);
      this.collectionFieldsContainer.innerHTML += collectionField;
    });

    // Add it to the shadow DOM
    const container = this.shadowRoot.getElementById(
      "collectionFieldsContainer"
    );

    // Clean the container
    container.innerHTML = "";

    container.innerHTML = this.collectionFieldsContainer.innerHTML;
  }

  addNewCollectionField() {
    this.fields.push({
      name: "",
      type: "text",
    });

    console.log("this.fields", this.fields);

    this.collectionFieldsContainer.innerHTML = "";

    // Recreate the collection fields
    this.fields.forEach((field, index) => {
      // Create a dendem input element
      const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`;
      console.log("collectionField", collectionField);
      this.collectionFieldsContainer.innerHTML += collectionField;
    });

    // Add it to the shadow DOM
    const container = this.shadowRoot.getElementById(
      "collectionFieldsContainer"
    );

    // Clean the container
    container.innerHTML = "";

    container.innerHTML = this.collectionFieldsContainer.innerHTML;

    // // Create a dendem input element
    // const collectionField = `<dendem-collection-field></dendem-collection-field>`

    // // Add the title element to the shadow DOM
    // console.log(this.collectionFieldsContainer)
    // this.collectionFieldsContainer.innerHTML += collectionField;
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    const button = this.shadowRoot.querySelector("button");

    button &&
      button.addEventListener("click", () => {
        console.log("clicked");
    });

    // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-name-changed'));
    this.addEventListener("field-name-changed", (e) => {
      this.updateField(e, "name");
    });

    // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-type-changed'));
    this.addEventListener("field-type-changed", (e) => {
      this.updateField(e, "type");
    });

    // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-deleted'));
    this.addEventListener("field-deleted", (e) => {
      this.deleteField(e);
    });

    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, CollectionStructureStyles];
    }
  }

  loadScripts() {
    // If GeneralInformation script is not loaded, load it
    if (!this.shadowRoot.querySelector("script")) {
      const collectionFieldScript = document.createElement("script");
      collectionFieldScript.src =
        "./routes/protocolos/CreateNew/CollectionStructure/CollectionField/index.js";
      collectionFieldScript.type = "module";

      this.shadowRoot.appendChild(collectionFieldScript);
    }
  }
}

// Register the custom element with the browser
customElements.define("dendem-collection-structure", CollectionStructure);
