import ButtonStyle from "./styles.js";

// Define a custom element called "Button"
class Button extends HTMLElement {
  constructor() {
    // Call the parent constructor
    super();

    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    // Create a button element
    const button = document.createElement("button");
    button.classList.add("button");

    this.addNavigateTo(button);

    // Create a label element and set its text content to the "label" attribute
    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = this.getAttribute("label");

    // Create an icon element and set its text content to the "icon" attribute
    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.textContent = this.getAttribute("icon");

    const onClick = this.getAttribute("onClick");

    // On click, dispatch a "click" event
    if (onClick)
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.dispatchEvent(new Event("click"));
      });

    // Add the label and icon elements to the button element
    button.appendChild(label);
    button.appendChild(icon);

    // Add the button element to the shadow DOM
    this.shadowRoot.appendChild(button);
  }

  addNavigateTo(button) {
    const navigateToRoute = this.getAttribute("navigate-to");
    if (!!navigateToRoute) {
      button.addEventListener("click", (e) => {
        document.querySelector("body").dispatchEvent(
          new CustomEvent("navigate-to", {
            detail: navigateToRoute,
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ButtonStyle];
    }
  }
}

// Register the custom element with the browser
customElements.define("dendem-button", Button);
