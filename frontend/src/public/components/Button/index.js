// Define a custom element called "Button"
class Button extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        // Create a shadow DOM for the element
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a button element
        const button = document.createElement('button');
        button.classList.add('button');
        const navigateToRoute = this.getAttribute("navigate-to")
        button.addEventListener('click', (e) => {
            console.log("sssssssssssss")

            document.querySelector('body').dispatchEvent(new CustomEvent("navigate-to", {
                detail: navigateToRoute,
                bubbles: true,
                composed: true
              }))
        })

        // Create a label element and set its text content to the "label" attribute
        const label = document.createElement('span');
        label.classList.add('label');
        label.textContent = this.getAttribute('label');

        // Create an icon element and set its text content to the "icon" attribute
        const icon = document.createElement('span');
        icon.classList.add('icon');
        icon.textContent = this.getAttribute('icon');

        const onClick = this.getAttribute('onClick');

        // On click, dispatch a "click" event
        onClick && button.addEventListener('click', () => {
            this.dispatchEvent(new Event('click'));
        });

        // Load the component's CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Button/styles.css';
        shadow.appendChild(link);

        // Add the label and icon elements to the button element
        button.appendChild(label);
        button.appendChild(icon);

        // Add the button element to the shadow DOM
        shadow.appendChild(button);
    }
}

// Register the custom element with the browser
customElements.define('dendem-button', Button);