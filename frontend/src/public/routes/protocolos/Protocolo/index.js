class MySection extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement("template");
      template.innerHTML = `
        <section id="container">
          <div class="superior">
            <h1 class="text-3xl">Casca de Açai</h1>
  
            <div class="blocos">
              <div class="bloco">
                <h2>350</h2>
                <span>Amostras</span>
              </div>
  
              <div class="bloco">
                <h2>150</h2>
                <span>Coletas Incompletas</span>
              </div>
  
              <div class="bloco">
                <h2>50</h2>
                <span>Coletores</span>
              </div>
            </div>
          </div>
  
          <section id="itens">
            <div class="botoes">
              <h3 class="text-lg">Coletas</h3>
              <h5 class="text-xs">Exportar</h5>
            </div>
  
            <div class="content">
              <div class="selecao">
                <h4></h4>
              </div>
  
              <div class="selecao">
                <h4></h4>
              </div>
  
              <div class="selecao">
                <h4></h4>
              </div>
  
              <div class="selecao">
                <h4></h4>
              </div>
            </div>
          </section>
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
  
  customElements.define("dendem-protocolo", MySection);