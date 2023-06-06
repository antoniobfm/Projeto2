class InputComponent extends HTMLElement {
  constructor() {
    super();

    // Get the whole component
    console.log('eoq')
    console.log(this)
    console.log(this.hasAttributes());

    // Get the component's attributes from the DOM
    const name = this.getAttribute('name');
    const type = this.getAttribute('type');
    const placeholder = this.getAttribute('placeholder');
    const label = this.getAttribute('label');

    console.log(name, type, placeholder, label)

    // Create a shadow root for the component
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a container for the component
    const container = document.createElement('div');
    container.classList.add('input-container');

    // Create the label element
    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    labelElement.htmlFor = name;
    labelElement.classList.add('label');

    // Create the input element
    const inputElement = document.createElement('input');
    inputElement.name = name;
    inputElement.type = type;
    inputElement.placeholder = placeholder;
    inputElement.classList.add('input');

    // Load the component's CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './components/Input/styles.css';
    shadow.appendChild(link);

    // Add the label and input elements to the container
    container.appendChild(labelElement);
    container.appendChild(inputElement);

    // Add the container to the shadow root
    shadow.appendChild(container);
  }
}

// Define the custom element
customElements.define('dendem-input', InputComponent);