import GeneralInformationStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

// Define a custom element called "Button"
class GeneralInformation extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    this.generalInformation = {
      name: this.getAttribute("protocol-name") || "",
      descricao: this.getAttribute("protocol-descricao") || "",
    };

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a tile element
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Informações Gerais";

    // Create a dendem input element for the protocol's name
    const nameDendemInput = `<dendem-input id="input-nome" name="nome" label="Nome do protocolo" placeholder="" type="text"></dendem-input>`;

    // Create a dendem input element for the protocol's description
    const descriptionDendemInput = `<dendem-input id="input-descricao" name="description" label="Descrição" placeholder="" type="text"></dendem-input>`;

    // Add the title element to the shadow DOM
    this.shadowRoot.appendChild(title);
    this.shadowRoot.innerHTML += nameDendemInput;
    this.shadowRoot.innerHTML += descriptionDendemInput;

    this.addEventListenerToDendemInput();
  }

  // Event listener for dendem-input
  addEventListenerToDendemInput() {
    // Get input inside dendem-input
    const dendemInputNameInput = this.shadowRoot
      .getElementById("input-nome")
      .shadowRoot.querySelector("input");

    // Add event listener to changes in the input protocol-name
    dendemInputNameInput.addEventListener("change", (event) => {
      console.log("protocol-name-changed");
      this.generalInformation.name = event.target.value;
      this.setAttribute("protocol-name", event.target.value);

      // Dispatch an event to notify the parent component that the field's name has changed
      // The parent component is another custom element called CollectionStructure
      const nameChangedEvent = new CustomEvent("protocol-name-changed", {
        detail: {
          generalInformation: this.generalInformation,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(nameChangedEvent);
    });
    // Get input inside dendem-input
    const dendemInputdescricaoInput = this.shadowRoot
      .getElementById("input-descricao")
      .shadowRoot.querySelector("input");

    // Add event listener to changes in the input protocol-descricao
    dendemInputdescricaoInput.addEventListener("change", (event) => {
      console.log("protocol-descricao-changed");
      this.generalInformation.descricao = event.target.value;
      this.setAttribute("protocol-descricao", event.target.value);

      // Dispatch an event to notify the parent component that the field's descricao has changed
      // The parent component is another custom element called CollectionStructure
      const descricaoChangedEvent = new CustomEvent("protocol-descricao-changed", {
        detail: {
          generalInformation: this.generalInformation,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(descricaoChangedEvent);
    });
  }

  // Handle changes to the element's attributes
  connectedCallback() {
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
