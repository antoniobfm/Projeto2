import ListaItemStyle from "./styles.js";

// Define a custom element called "Button"
class ListaItem extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    // Get nome from attributes
    const name = this.getAttribute("name");
    const protocolo_id = this.getAttribute("protocolo-id");

    // Create a shadow root for the component
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    // Create a button element
    const button = document.createElement("button");
    button.classList.add("lista-item");
    button.innerHTML = name;

    // Add the button element to the shadow DOM
    this.shadowRoot.appendChild(button);

    // Load the ListaItem component's CSS file
    // const stylesListaItem = document.createElement('link');
    // stylesListaItem.rel = 'stylesheet';
    // stylesListaItem.href = "./routes/protocolos/Lista/ListaItem/styles.css";
    // this.shadowRoot.appendChild(stylesListaItem);

    this.addEventListenerToListaItem();
  }

  // Define the attributes to observe
  static get observedAttributes() {
    return ["name"];
  }

  addEventListenerToListaItem() {
    const listaItem = this.shadowRoot.querySelector("button");

    if (!!listaItem && !listaItem.onclick) {
      // Dispatch an event to the host when the ListaItem is clicked
      listaItem.addEventListener("click", (e) => {
        console.log("clicked lista item", this.getAttribute("protocolo-id"));
        this.dispatchEvent(
          new CustomEvent("protocolo-clicked", {
            detail: {
              protocolo: this.getAttribute("protocolo-id"),
            },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

  // Handle changes to an attribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      const button = this.shadowRoot.querySelector("button");
      button.innerHTML = newValue;
    }
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    console.log(!this.shadowRoot.adoptedStyleSheets.length);
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaItemStyle];
    }

    const button = this.shadowRoot.querySelector("button");
    button &&
      button.addEventListener("click", () => {
        console.log("clicked");
      });
  }

  // Handle changes to the element's attributes
  disconnectedCallback() {
    const button = this.shadowRoot.querySelector("button");
    button &&
      button.removeEventListener("click", () => {
        console.log("clicked");
      });
  }

  // Handle changes to the element's attributes
  adoptedCallback() {
    const button = this.shadowRoot.querySelector("button");
    button &&
      button.removeEventListener("click", () => {
        console.log("clicked");
      });
  }
}

// Register the custom element with the browser
customElements.define("dendem-lista-item", ListaItem);
