class MySection extends HTMLElement {
    constructor() {
      super();

      this.protocolo_id = this.getAttribute("protocolo-id");

      this.protocolo = {
        id: "",
        nome: "Carregando...",
        foto_url: "",
        ativo: 1
      }
  
      this.attachShadow({ mode: "open" });

      this.protocolo_id && this.loadProtocolo()
      
      this.render();
    }

    loadStyles() {
      if (!this.shadowRoot.querySelector('link')) {
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = './routes/protocolos/Protocolo/styles.css';
        this.shadowRoot.appendChild(styles);
      }
    }

    async loadProtocolo() {
      if (!this.protocolo_id) {
        return;
      }
      const response = await fetch(`http://localhost:3334/protocolos/${this.protocolo_id}`);

      const protocolo = await response.json()

      console.log(protocolo)

      if (!protocolo) {
        return;
      }

      this.protocolo = {
        id: protocolo.protocolo_id,
        nome: protocolo.nome,
        foto_url: protocolo.foto_url,
        ativo: protocolo.ativo
      };

      if (this.protocolo.foto_url) {
        this.render();
      }
      
      return protocolo;
    }

    render() {
      const template = document.createElement("template");
      console.log('aaaaaaaaaathis.protocolo')
      console.log(this.protocolo)
      template.innerHTML = `
        <section id="container">
          <div class="superior">
            <h1 class="text-3xl">${this.protocolo.nome}</h1>
  
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

      this.shadowRoot.innerHTML = template.innerHTML;

      this.loadStyles();
    }
  }
  
  customElements.define("dendem-protocolo", MySection);