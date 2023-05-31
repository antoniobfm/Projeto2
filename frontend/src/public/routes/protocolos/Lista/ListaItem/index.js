// Define a custom element called "Button"
class ListaItem extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        // Get nome from attributes
        const name = this.getAttribute('name');
        console.log(name)
        
        // Create a shadow DOM for the element
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a button element
        const button = document.createElement('button');
        button.classList.add('lista-item');
        button.innerHTML = name;

        // Add the button element to the shadow DOM
        shadow.appendChild(button);

        // Load the ListaItem component's CSS file
        const stylesListaItem = document.createElement('link');
        stylesListaItem.rel = 'stylesheet';
        stylesListaItem.href = "./routes/protocolos/Lista/ListaItem/styles.css";
        this.shadowRoot.appendChild(stylesListaItem);
    }

    // Define the attributes to observe
    static get observedAttributes() {
        return ['name'];
    }

    // Handle changes to an attribute
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name') {
            const button = this.shadowRoot.querySelector('button');
            button.innerHTML = newValue;
        }
    }

    // Handle changes to the element's attributes
    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', () => {
            console.log('clicked');
        });
    }

    // Handle changes to the element's attributes   
    disconnectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        button.removeEventListener('click', () => {
            console.log('clicked');
        });
    }

    // Handle changes to the element's attributes
    adoptedCallback() {
        const button = this.shadowRoot.querySelector('button');
        button.removeEventListener('click', () => {
            console.log('clicked');
        });
    }
}

// Register the custom element with the browser
customElements.define('dendem-lista-item', ListaItem);