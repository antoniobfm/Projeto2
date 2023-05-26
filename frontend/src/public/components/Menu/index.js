class CustomNav extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root for the component
        const shadow = this.attachShadow({ mode: 'open' });

        // Get the active page from the 'active-page' attribute
        const activePage = this.getAttribute('active-page');

        // Include the main CSS file
        const linkMain = document.createElement('link');
        linkMain.rel = 'stylesheet';
        linkMain.href = './styles.css';
        shadow.appendChild(linkMain);

        // Create a nav element
        const nav = document.createElement('nav');

        // Copy the attributes from the original element
        const attributes = this.attributes;
        for (let i = 0; i < attributes.length; i++) {
            nav.setAttribute(attributes[i].name, attributes[i].value);
        }

        // Create a container for the logo and menu
        const container = document.createElement('div');
        container.classList.add('container');

        // Create a logo element
        const logo = document.createElement('div');
        logo.classList.add('logo');
        logo.innerHTML = '<span>DENDEM</span>';

        const logoSpan = logo.querySelector('span');
        logoSpan.classList.add('text-xl', 'font-bold', 'text-gray-900');

        // Create a menu element
        const menu = document.createElement('div');
        menu.classList.add('menu');
        menu.innerHTML = `<dendem-menu-button onclick="navigateTo('protocolos')" label="Protocolos" icon="/assets/retangulo.svg" page="protocolos" active-page="${activePage}"></dendem-menu-button>`;
        menu.innerHTML += `<dendem-menu-button onclick="navigateTo('coletores')" label="Coletores" icon="/assets/retangulo.svg" page="coletores" active-page="${activePage}"></dendem-menu-button>`;


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

        // Load dendem-menu-button component
        const scriptMenuButton = document.createElement('script');
        scriptMenuButton.src = '/components/Menu/Button/index.js';
        scriptMenuButton.type = 'module';
        document.body.appendChild(scriptMenuButton);

        // Load dendem-menu-button component styles
        const linkMenuButton = document.createElement('link');
        linkMenuButton.rel = 'stylesheet';
        linkMenuButton.href = './components/Menu/Button/styles.css';
        document.body.appendChild(linkMenuButton);

        // Load the component's CSS file
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Menu/styles.css';
        shadow.appendChild(link);

        // Add the nav element to the shadow root
        shadow.appendChild(nav);
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