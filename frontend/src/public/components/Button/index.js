// Button component
class Button extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const button = document.createElement('button');
        button.classList.add('button');

        const label = document.createElement('span');
        label.classList.add('label');
        label.textContent = this.getAttribute('label');

        const icon = document.createElement('span');
        icon.classList.add('icon');
        icon.textContent = this.getAttribute('icon');

        // Load the component's CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Button/styles.css';
        shadow.appendChild(link);

        button.appendChild(label);
        button.appendChild(icon);

        shadow.appendChild(button);
    }
}
  
customElements.define('dendem-button', Button);