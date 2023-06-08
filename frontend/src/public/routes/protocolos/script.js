class MyPage extends HTMLElement {
    constructor() {
        super();
        this.selectedProtocol = null;
        this.sidebar = null;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();

        // Listen to protocolo-clicked event
        this.addEventListener('protocolo-clicked', (e) => {
            console.log('protocolo-clicked event received');
            this.selectedProtocol = e.detail.protocolo;

            // Substitute
            this.render();
        });

        this.addEventListener('export-clicked', (e) => {
            this.sidebar = 'export';

            this.render()
        });
    }

    render() {
        this.shadow.innerHTML = '';

        // Create a template element and append the div element to its content
        const dashboard = document.createElement('div');
        dashboard.setAttribute('id', 'dashboard');

        this.loadScripts();
        this.loadStyles();

        const navbar = '<dendem-nav active-page="protocolos"></dendem-nav>';

        const lista = '<dendem-lista></dendem-lista>';

        const protocolo = `<dendem-protocolo protocolo-id='${this.selectedProtocol}'></dendem-protocolo>`;
    
        const createNew = '<dendem-create-new-protocolo></dendem-create-new-protocolo>';

        const exportSamples = '<dendem-export-samples title="Export Samples"></dendem-export-samples>';
    
        if (this.selectedProtocol) {
            dashboard.innerHTML = navbar + lista + protocolo;

            if (this.sidebar) {
                if (this.sidebar === 'export') {
                    dashboard.innerHTML += exportSamples;
                }
            }
        } else {
            dashboard.innerHTML = navbar + lista + createNew;
        }

        // Append the template content to the shadow root
        this.shadow.appendChild(dashboard);
    }

    loadStyles() {
        if (!this.shadowRoot.querySelector('link')) {
            // Append ExportSamples style to the page
            const style = document.createElement('link');
            style.href = '/routes/protocolos/styles.css';
            style.rel = 'stylesheet';
            this.shadow.appendChild(style);
        }
    }

    loadScripts() {
        if (!this.shadowRoot.querySelector('script')) {
            // Append ExportSamples script to the page as module
            const script = document.createElement('script');
            script.src = '/routes/protocolos/ExportSamples/index.js';
            script.type = 'module';
            this.appendChild(script);
        
            console.log('ExportSamples script loaded')
        
            // Append Menu script to the page as module
            const scriptMenu = document.createElement('script');
            scriptMenu.src = '/components/Menu/index.js';
            scriptMenu.type = 'module';
            this.appendChild(scriptMenu);
        
            console.log('Menu script loaded')
        
            // Append Protocolos script to the page as module
            const scriptProtocolos = document.createElement('script');
            scriptProtocolos.src = '/routes/protocolos/Protocolo/index.js';
            scriptProtocolos.type = 'module';
            this.appendChild(scriptProtocolos);
        
            // Append Create New script to the page as module
            const scriptCreateNew = document.createElement('script');
            scriptCreateNew.src = '/routes/protocolos/CreateNew/index.js';
            scriptCreateNew.type = 'module';
            this.appendChild(scriptCreateNew);
        
            // Append Lista script to the page as module
            const scriptLista = document.createElement('script');
            scriptLista.src = '/routes/protocolos/Lista/index.js';
            scriptLista.type = 'module';
            this.appendChild(scriptLista);
        }
    }
}

  
  customElements.define('dendem-protocolos', MyPage);