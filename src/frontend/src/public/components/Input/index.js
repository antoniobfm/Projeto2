import InputStyles from "./styles.js";

class InputComponent extends HTMLElement {
  constructor() {
    super();

    // Get the component's attributes from the DOM
    const name = this.getAttribute("name");
    const type = this.getAttribute("type");
    const placeholder = this.getAttribute("placeholder");
    const label = this.getAttribute("label");

    console.log(name, type, placeholder, label);

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a container for the component
    const container = document.createElement("div");
    container.classList.add("input-container");

    // Create the label element
    const labelElement = document.createElement("label");
    labelElement.innerText = label;
    labelElement.htmlFor = name;
    labelElement.classList.add("label");

    // Create the input element
    const inputElement = document.createElement("input");
    inputElement.name = name;
    inputElement.type = type;
    inputElement.placeholder = placeholder;
    inputElement.classList.add("input");

    // Add the label and input elements to the container
    container.appendChild(labelElement);
    container.appendChild(inputElement);

    // Add the container to the shadow root
    this.shadowRoot.appendChild(container);
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [InputStyles];
    }
  }
}

// Define the custom element
const Input = customElements.define("dendem-input", InputComponent);

export default Input;
