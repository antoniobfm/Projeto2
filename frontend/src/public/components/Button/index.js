// Define a custom element called "Button"
class Button extends HTMLElement {
    constructor() {
        // Call the parent constructor
        super();

        this.attachShadow({ mode: 'open' });

        this.render();

        // Load the component's CSS file
        this.loadStyles()
    }

    render() {
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
        onClick && button.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new Event('click'));
        });

        // Add the label and icon elements to the button element
        button.appendChild(label);
        button.appendChild(icon);

        // Add the button element to the shadow DOM
        this.shadowRoot.appendChild(button);
    }

    loadStyles() {
        // If the component's CSS file is already loaded, do nothing
        if (this.shadowRoot && this.shadowRoot.querySelector('link')) return;

        // Load the component's CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Button/styles.css';
        this.shadowRoot.appendChild(link);
    }
}

// Register the custom element with the browser
customElements.define('dendem-button', Button);