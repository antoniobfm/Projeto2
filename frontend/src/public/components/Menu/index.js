class CustomNav extends HTMLElement {
    constructor() {
        super();

        // Get the active page from the 'active-page' attribute
        this.activePage = this.getAttribute('active-page');

        // Create a shadow root for the component
        this.attachShadow({ mode: 'open' });

        this.render();

        this.loadScripts();

        this.loadStyles();
    }

    render() {
        // Create a nav element
        const nav = document.createElement('nav');
        
        // Copy the attributes from the original element
        for (let i = 0; i < this.attributes.length; i++) {
            nav.setAttribute(this.attributes[i].name, this.attributes[i].value);
        }

        // Create a container for the logo and menu
        const container = document.createElement('div');
        container.classList.add('container');

        // Create a logo element
        const logo = document.createElement('div');
        logo.classList.add('logo');
        logo.innerHTML = '<span>DENDEM</span>';
        logo.addEventListener('click', () => {
            navigateTo('/');
        });

        const logoSpan = logo.querySelector('span');
        logoSpan.classList.add('text-xl', 'font-bold', 'text-gray-900');

        // Create a menu element
        const menu = document.createElement('div');
        menu.classList.add('menu');
        menu.innerHTML = `<dendem-menu-button onclick="navigateTo('protocolos')" label="Protocolos" icon="/assets/retangulo.svg" page="protocolos" active-page="${this.activePage}"></dendem-menu-button>`;
        menu.innerHTML += `<dendem-menu-button onclick="navigateTo('coletores')" label="Coletores" icon="/assets/retangulo.svg" page="coletores" active-page="${this.activePage}"></dendem-menu-button>`;

        // Create a footer element
        const footer = document.createElement('div');
        footer.classList.add('footer');
        footer.innerHTML = '<button>Sair</button>';

        // Add button to footer
        const button = footer.querySelector('button');
        button.classList.add('text-base', 'font-bold', 'text-gray-900');

        // Add the logo, menu, and footer elements to the nav
        container.appendChild(logo);
        container.appendChild(menu);
        nav.appendChild(container);
        nav.appendChild(footer);

        // Add the nav element to the shadow root
        this.shadowRoot.appendChild(nav);
    }

    loadScripts() {
        // If ListaItem script is not loaded, load it
        if (!this.shadowRoot.querySelector("script")) {
            // Load dendem-menu-button component
            const scriptMenuButton = document.createElement('script');
            scriptMenuButton.src = '/components/Menu/Button/index.js';
            scriptMenuButton.type = 'module';
            document.body.appendChild(scriptMenuButton);
        }
    }

    loadStyles() {
        // If there isn't a style tag in the shadow root, create one and append the template content to it
        if (!this.shadowRoot.querySelector("link")) {
            // Load the component's CSS file
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './components/Menu/styles.css';
            this.shadowRoot.appendChild(link);

            // Include the main CSS file
            const linkMain = document.createElement('link');
            linkMain.rel = 'stylesheet';
            linkMain.href = './styles.css';
            this.shadowRoot.appendChild(linkMain);

            // Load dendem-menu-button component styles
            const linkMenuButton = document.createElement('link');
            linkMenuButton.rel = 'stylesheet';
            linkMenuButton.href = './components/Menu/Button/styles.css';
            document.body.appendChild(linkMenuButton);
        }
    }

    // Define the 'activePage' property
    get activePage() {
        return this.getAttribute('active-page');
    }

    set activePage(value) {
        this.setAttribute('active-page', value);
    }

    static get observedAttributes() {
        return ['active-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-page' && oldValue !== newValue) {
            // Update the active page in the menu button
            const menuButton = this.shadowRoot.querySelector('dendem-menu-button');
            menuButton.setAttribute('active-page', newValue);
        }
    }
}

// Define the custom element
customElements.define('dendem-nav', CustomNav);