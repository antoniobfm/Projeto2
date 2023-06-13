import CollectionFieldStyles from "./styles.js";
import AppStyles from "../../../styles.js";

// Define a custom element called "Button"
class CollectionField extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    this.field = {
      name: this.getAttribute("field-name"),
      type: this.getAttribute("field-type"),
    };

    // Get if the field is required from attributes
    const required = this.getAttribute("required");

    // Create a shadow DOM for the element
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a tile element
    const container = document.createElement("div");
    container.classList.add("collection-field");

    // Create a container for the input that defines the field's name and type
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("collection-field__input-container");

    //  Create a input element for the field's name
    const input = document.createElement("input");
    input.classList.add("collection-field__input");
    input.placeholder = "Nome do campo";
    input.value = this.field.name;
    input.type = "text";

    // Create a select element
    const select = document.createElement("select");
    select.classList.add("collection-field__select");

    // Create a option element
    const option = document.createElement("option");
    option.classList.add("collection-field__option");
    option.value = "text";
    // this.field.type === 'text' && option.setAttribute('selected');
    option.innerText = "Texto";

    // Create a option element
    const optionDescription = document.createElement("option");
    optionDescription.classList.add("collection-field__option");
    optionDescription.value = "long-text";
    // Select the option if the field's type is 'long-text'
    optionDescription.innerText = "Texto longo";

    // Create a container for the actions that can be performed on the field
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("collection-field__actions-container");

    // Create a button to delete the field
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("collection-field__delete-button");
    deleteButton.innerText = "DELETAR";

    // Create a button set the field as required
    const requiredButton = document.createElement("button");
    requiredButton.classList.add("collection-field__required-button");
    requiredButton.innerText = "OBRIGATÓRIO?";

    if (required) {
      requiredButton.innerText += " SIM";
    } else {
      requiredButton.innerText += " NÃO";
    }

    // Add the actions to the actions container
    actionsContainer.appendChild(deleteButton);
    // actionsContainer.appendChild(requiredButton);

    // Add the title element to the shadow DOM
    this.shadowRoot.appendChild(container);
    container.appendChild(inputContainer);
    inputContainer.appendChild(input);
    inputContainer.appendChild(select);
    select.innerHTML += option.outerHTML;
    select.innerHTML += optionDescription.outerHTML;
    container.appendChild(actionsContainer);

    // Add event listener to changes in the input field-name
    input.addEventListener("change", (event) => {
      console.log("field-name-changed");
      this.field.name = event.target.value;
      this.setAttribute("field-name", event.target.value);

      // Dispatch an event to notify the parent component that the field's name has changed
      // The parent component is another custom element called CollectionStructure
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

    // Add event listener to changes in the select field-type
    select.addEventListener("change", (event) => {
      console.log("field-type-changed");
      this.field.type = event.target.value;
      this.setAttribute("field-type", event.target.value);

      // Dispatch an event to notify the parent component that the field's type has changed
      // The parent component is another custom element called CollectionStructure
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

    // Add event listener to the delete button
    deleteButton.addEventListener("click", (event) => {
      console.log("field-deleted");

      // Dispatch an event to notify the parent component that the field has been deleted
      // The parent component is another custom element called CollectionStructure
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

  // Dispatch an event when the field-name value changes
  attributeChangedCallback(name, oldValue, newValue) {
    // if (name === 'field-name') {
    //     const button = this.shadowRoot.querySelector('button');
    //     button.innerHTML = newValue;
    // }
  }

  loadScripts() {}

  // Handle changes to the element's attributes
  connectedCallback() {
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [CollectionFieldStyles, AppStyles];
    }
  }
}

// Register the custom element with the browser
customElements.define("dendem-collection-field", CollectionField);
