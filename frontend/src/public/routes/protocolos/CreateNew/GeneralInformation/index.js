// Define a custom element called "Button"
class ListaItem extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();
        
        // Get shadow dom from parent
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a tile element
        const title = document.createElement('h2');
        title.classList.add('text-lg');
        title.classList.add('font-bold');
        title.textContent = 'Informações Gerais';

        // Create a dendem input element
        const dendemInput = `<dendem-input name="nome" label="Nome" placeholder="" type="text"></dendem-input>`

        console.log(dendemInput)

        // Add the title element to the shadow DOM
        shadow.appendChild(title);
        shadow.innerHTML += dendemInput;

        // Load the GeneralInformation component's CSS file
        const stylesGeneralInformation = document.createElement('link');
        stylesGeneralInformation.rel = 'stylesheet';
        stylesGeneralInformation.href = "./routes/protocolos/CreateNew/GeneralInformation/styles.css";
        this.shadowRoot.appendChild(stylesGeneralInformation);

        // Load the root app component's CSS file
        const stylesApp = document.createElement('link');
        stylesApp.rel = 'stylesheet';
        stylesApp.href = "./styles.css";
        this.shadowRoot.appendChild(stylesApp);
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
        button && button.addEventListener('click', () => {
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
customElements.define('dendem-general-information', ListaItem);