// Define a custom element called "Button"
class ListaItem extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        this.generalInformation = {
            name: this.getAttribute('protocol-name') || '',
        }
        
        // Get shadow dom from parent
        this.shadow = this.attachShadow({ mode: 'open' });

        // Create a tile element
        const title = document.createElement('h2');
        title.classList.add('text-lg');
        title.classList.add('font-bold');
        title.textContent = 'Informações Gerais';

        // Create a dendem input element
        const dendemInput = `<dendem-input name="nome" label="Nome do protocolo" placeholder="" type="text"></dendem-input>`

        // Create a button to add a create the protocol
        const createProtocol = `<dendem-button id="createProtocol" shadow-id="create-protocol-button" label="Criar protocolo"></dendem-button>`

        // Add the title element to the shadow DOM
        this.shadow.appendChild(title);
        this.shadow.innerHTML += dendemInput;
        this.shadow.innerHTML += createProtocol;

        this.loadStyles();

        this.addEventListenerToDendemInput();
        this.addEventListenerToDendemButton();
    }

    // Event listener for dendem-input
    addEventListenerToDendemInput() {
        // Get input inside dendem-input
        const dendemInputInput = this.shadowRoot.querySelector('dendem-input').shadowRoot.querySelector('input');

        // Add event listener to changes in the input protocol-name
        dendemInputInput.addEventListener('change', (event) => {
            console.log('protocol-name-changed');
            this.generalInformation.name = event.target.value;
            this.setAttribute('protocol-name', event.target.value);

            // Dispatch an event to notify the parent component that the field's name has changed
            // The parent component is another custom element called CollectionStructure
            const nameChangedEvent = new CustomEvent('protocol-name-changed', {
                detail: {
                    generalInformation: this.generalInformation
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
        const dendemButton = this.shadowRoot.querySelector('[shadow-id="create-protocol-button"]');

        // Add event listener to click in the button
        dendemButton.addEventListener('click', (event) => {
            console.log('create-protocol-button-clicked');
            
            // Dispatch an event to notify the parent component that the button has been clicked
            // The parent component is another custom element called CollectionStructure
            const buttonClickedEvent = new CustomEvent('create-protocol-button-clicked', {
                detail: {
                    generalInformation: this.generalInformation
                },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(buttonClickedEvent);
        });
    }



    loadStyles() {
        if (!this.shadowRoot.querySelector("link")) {
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
    }
}

// Register the custom element with the browser
customElements.define('dendem-general-information', ListaItem);