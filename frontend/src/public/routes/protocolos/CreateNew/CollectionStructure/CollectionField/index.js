// Define a custom element called "Button"
class CollectionField extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        this.field = {
            name: this.getAttribute('field-name'),
            type: this.getAttribute('field-type'),
        }

        // Get if the field is required from attributes
        const required = this.getAttribute('required');
        
        // Create a shadow DOM for the element
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a tile element
        const container = document.createElement('div');
        container.classList.add('collection-field');

        // Create a container for the input that defines the field's name and type
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('collection-field__input-container');

        //  Create a input element for the field's name
        const input = document.createElement('input');
        input.classList.add('collection-field__input');
        input.placeholder = 'Nome do campo';
        input.value = this.field.name;
        input.type = 'text';

        // Create a select element
        const select = document.createElement('select');
        select.classList.add('collection-field__select');

        // Create a option element
        const option = document.createElement('option');
        option.classList.add('collection-field__option');
        option.value = 'text';
        option.innerText = 'Texto';

        // Create a option element
        const optionDescription = document.createElement('option');
        optionDescription.classList.add('collection-field__option');
        optionDescription.value = 'long-text';
        optionDescription.innerText = 'Texto longo';

        // Create a container for the actions that can be performed on the field
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('collection-field__actions-container');

        // Create a button to delete the field
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('collection-field__delete-button');
        deleteButton.innerText = 'DELETAR';

        // Create a button set the field as required
        const requiredButton = document.createElement('button');
        requiredButton.classList.add('collection-field__required-button');
        requiredButton.innerText = 'OBRIGATÓRIO?';

        if (required) {
            requiredButton.innerText += ' SIM';
        } else {
            requiredButton.innerText += ' NÃO';
        }

        // Add the actions to the actions container
        actionsContainer.appendChild(deleteButton);
        actionsContainer.appendChild(requiredButton);


        // Add the title element to the shadow DOM
        shadow.appendChild(container);
        container.appendChild(inputContainer);
        inputContainer.appendChild(input);
        inputContainer.appendChild(select);
        select.innerHTML += option.outerHTML;
        select.innerHTML += optionDescription.outerHTML;
        container.appendChild(actionsContainer);

        // Add event listener to changes in the input field-name
        input.addEventListener('change', (event) => {
            console.log('field-name-changed');
            this.field.name = event.target.value;
            this.setAttribute('field-name', event.target.value);

            // Dispatch an event to notify the parent component that the field's name has changed
            // The parent component is another custom element called CollectionStructure
            const fieldChangedEvent = new CustomEvent('field-name-changed', {
                detail: {
                    fieldIndex: this.getAttribute('field-index'),
                    fieldName: event.target.value,
                },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(fieldChangedEvent);
        });

        // Add event listener to changes in the select field-type
        select.addEventListener('change', (event) => {
            console.log('field-type-changed');
            this.field.type = event.target.value;
            this.setAttribute('field-type', event.target.value);

            // Dispatch an event to notify the parent component that the field's type has changed
            // The parent component is another custom element called CollectionStructure
            const fieldChangedEvent = new CustomEvent('field-type-changed', {
                detail: {
                    fieldIndex: this.getAttribute('field-index'),
                    fieldType: event.target.value,
                },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(fieldChangedEvent);
        });

        // Add event listener to the delete button
        deleteButton.addEventListener('click', (event) => {
            console.log('field-deleted');

            // Dispatch an event to notify the parent component that the field has been deleted
            // The parent component is another custom element called CollectionStructure
            const fieldDeletedEvent = new CustomEvent('field-deleted', {
                detail: {
                    fieldIndex: this.getAttribute('field-index'),
                },
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(fieldDeletedEvent);
        });

        this.loadStyles();
    }

    // Define the attributes to observe
    static get observedAttributes() {
        return ['name', 'field-name'];
    }

    // Dispatch an event when the field-name value changes
    attributeChangedCallback(name, oldValue, newValue) {
        // if (name === 'field-name') {
        //     const button = this.shadowRoot.querySelector('button');
        //     button.innerHTML = newValue;
        // }
    }

    loadStyles() {
        // If styles are already loaded, do nothing
        if (this.shadowRoot.querySelector('link')) return;

        // Load the GeneralInformation component's CSS file
        const stylesGeneralInformation = document.createElement('link');
        stylesGeneralInformation.rel = 'stylesheet';
        stylesGeneralInformation.href = "./routes/protocolos/CreateNew/CollectionStructure/CollectionField/styles.css";
        this.shadowRoot.appendChild(stylesGeneralInformation);

        // Load the root app component's CSS file
        const stylesApp = document.createElement('link');
        stylesApp.rel = 'stylesheet';
        stylesApp.href = "./styles.css";
        this.shadowRoot.appendChild(stylesApp);
    }

    loadScripts() {}
}

// Register the custom element with the browser
customElements.define('dendem-collection-field', CollectionField);