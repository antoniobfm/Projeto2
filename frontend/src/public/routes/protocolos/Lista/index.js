class MySection extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement("template");
        template.innerHTML = `
            <div class="protocolos">
                <h2 class="text-3xl">Protocolos</h2>
                <div class="botoes">
                    <a href="#" class="link active">Ativos</a>
                    <a href="#" class="link">Finalizados</a><br>
                </div>
            </div>
        `;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Load the component's CSS file
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = './routes/protocolos/Lista/styles.css';
        this.shadowRoot.appendChild(styles);
    }
}

customElements.define("dendem-lista", MySection);