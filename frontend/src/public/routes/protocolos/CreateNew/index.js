class MySection extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement("template");
      template.innerHTML = `
        <section id="container">
          <div id="superior">
            <div id="caixa_titulo">
                <h1 id="titulo">Criar novo</h1>
            </div>
          </div>
        </section>
      `;
  
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Load the component's CSS file
      const styles = document.createElement('link');
      styles.rel = 'stylesheet';
      styles.href = './routes/protocolos/Protocolo/styles.css';
      this.shadowRoot.appendChild(styles);
    }
  }
  
  customElements.define("dendem-create-new-protocolo", MySection);