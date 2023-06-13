import GeneralInformationStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

// Define a custom element called "Button"
class GeneralInformation extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    this.generalInformation = {
      name: this.getAttribute("protocol-name") || "",
    };

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a tile element
    const title = document.createElement("h2");
    title.classList.add("text-lg");
    title.classList.add("font-bold");
    title.textContent = "Informações Gerais";

    // Create a dendem input element
    const dendemInput = `<dendem-input name="nome" label="Nome do protocolo" placeholder="" type="text"></dendem-input>`;

    // Add the title element to the shadow DOM
    this.shadowRoot.appendChild(title);
    this.shadowRoot.innerHTML += dendemInput;

    this.addEventListenerToDendemInput();
  }

  // Event listener for dendem-input
  addEventListenerToDendemInput() {
    // Get input inside dendem-input
    const dendemInputInput = this.shadowRoot
      .querySelector("dendem-input")
      .shadowRoot.querySelector("input");

    // Add event listener to changes in the input protocol-name
    dendemInputInput.addEventListener("change", (event) => {
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
  }

  // Event listener for dendem-button
  addEventListenerToDendemButton() {
    // Get button inside dendem-button
    const dendemButton = this.shadowRoot.querySelector(
      '[shadow-id="create-protocol-button"]'
    );

    // Add event listener to click in the button
    dendemButton.addEventListener("click", (event) => {
      console.log("create-protocol-button-clicked");

      // Dispatch an event to notify the parent component that the button has been clicked
      // The parent component is another custom element called CollectionStructure
      const buttonClickedEvent = new CustomEvent(
        "create-protocol-button-clicked",
        {
          detail: {
            generalInformation: this.generalInformation,
          },
          bubbles: true,
          composed: true,
        }
      );
      this.dispatchEvent(buttonClickedEvent);
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
