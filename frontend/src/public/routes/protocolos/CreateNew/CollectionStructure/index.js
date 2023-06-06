// Define a custom element called "Button"
class CollectionStructure extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        this.fields = [];
        
        // Create a shadow DOM for the element
        this.shadow = this.attachShadow({ mode: 'open' });

        // Create a tile element
        const title = document.createElement('h2');
        title.classList.add('text-lg');
        title.classList.add('font-bold');
        title.textContent = 'Estrutura da Coleta';

        // Create a element to hold the collection fields
        this.collectionFieldsContainer = document.createElement('div');
        this.collectionFieldsContainer.id = 'collectionFieldsContainer';
        this.collectionFieldsContainer.classList.add('collection-fields-container');

        // Create a button to add a new collection field
        const addNewCollectionFieldButton = `<dendem-button id="addCollectionFieldButton" shadow-id="add-collection-field" label="Adicionar novo campo"></dendem-button>`
        

        // Add the title element to the shadow DOM
        this.shadow.appendChild(title);
        this.shadow.appendChild(this.collectionFieldsContainer);
        this.shadow.innerHTML += addNewCollectionFieldButton;

        this.addNewCollectionField()

        // Add event listener to dendem-button using shadow-id
        const addCollectionFieldButton = this.shadowRoot.querySelector('[shadow-id="add-collection-field"]');

        addCollectionFieldButton.addEventListener('click', () => {
            this.addNewCollectionField();
        });

        this.loadScripts();
        this.loadStyles();

        // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-name-changed'));
        this.addEventListener('field-name-changed', (e) => {
            console.log('asdofkasodkf')
            this.updateFieldName(e);
        });

        // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-type-changed'));
        this.addEventListener('field-type-changed', (e) => {
            console.log('asdofkasodkf')
            this.updateFieldType(e);
        });

        // Receive an event from dendem-collection-field this.dispatchEvent(new Event('field-deleted'));
        this.addEventListener('field-deleted', (e) => {
            console.log('asdofkasodkf')
            this.deleteField(e);
        });
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

    updateFieldName(e) {
        console.log('okokoko')
        const fieldIndex = e.detail.fieldIndex;
        const fieldName = e.detail.fieldName;

        this.fields[fieldIndex].name = fieldName;
    }

    updateFieldType(e) {
        console.log('okokoko')
        const fieldIndex = e.detail.fieldIndex;
        const fieldType = e.detail.fieldType;

        this.fields[fieldIndex].type = fieldType;
    }

    deleteField(e) {
        console.log('okokoko')
        
        const fieldIndex = e.detail.fieldIndex;

        this.fields.splice(fieldIndex, 1);

        this.collectionFieldsContainer.innerHTML = '';

        // Recreate the collection fields
        this.fields.forEach((field, index) => {
            // Create a dendem input element
            const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`
            console.log('collectionField', collectionField);
            this.collectionFieldsContainer.innerHTML += collectionField;
        });
        
        // Add it to the shadow DOM
        const container = this.shadow.getElementById('collectionFieldsContainer')

        // Clean the container
        container.innerHTML = '';

        container.innerHTML = this.collectionFieldsContainer.innerHTML;
    }
        

    addNewCollectionField() {
        this.fields.push({
            name: '',
            type: 'text',
        });

        console.log('this.fields', this.fields)

        this.collectionFieldsContainer.innerHTML = '';

        // Recreate the collection fields
        this.fields.forEach((field, index) => {
            // Create a dendem input element
            const collectionField = `<dendem-collection-field shadow-id="collection-field-${index}" field-name="${field.name}" field-type="${field.type}" field-index="${index}"></dendem-collection-field>`
            console.log('collectionField', collectionField);
            this.collectionFieldsContainer.innerHTML += collectionField;
        });
        
        // Add it to the shadow DOM
        const container = this.shadow.getElementById('collectionFieldsContainer')

        // Clean the container
        container.innerHTML = '';

        container.innerHTML = this.collectionFieldsContainer.innerHTML;

        // // Create a dendem input element
        // const collectionField = `<dendem-collection-field></dendem-collection-field>`
    
        // // Add the title element to the shadow DOM
        // console.log(this.collectionFieldsContainer)
        // this.collectionFieldsContainer.innerHTML += collectionField;
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

    loadStyles() {
        // If GeneralInformation styles are not loaded, load them
        if (!this.shadowRoot.querySelector("link")) {
            const stylesGeneralInformation = document.createElement('link');
            stylesGeneralInformation.rel = 'stylesheet';
            stylesGeneralInformation.href = "./routes/protocolos/CreateNew/CollectionStructure/styles.css";
            this.shadowRoot.appendChild(stylesGeneralInformation);

            // Load the root app component's CSS file
            const stylesApp = document.createElement('link');
            stylesApp.rel = 'stylesheet';
            stylesApp.href = "./styles.css";
            this.shadowRoot.appendChild(stylesApp);
        };
    }

    loadScripts() {
      // If GeneralInformation script is not loaded, load it
      if (!this.shadowRoot.querySelector("script")) {
        const collectionFieldScript = document.createElement("script");
        collectionFieldScript.src = "./routes/protocolos/CreateNew/CollectionStructure/CollectionField/index.js";
        collectionFieldScript.type = "module";
        
        this.shadowRoot.appendChild(collectionFieldScript);
      };
    }
}

// Register the custom element with the browser
customElements.define('dendem-collection-structure', CollectionStructure);