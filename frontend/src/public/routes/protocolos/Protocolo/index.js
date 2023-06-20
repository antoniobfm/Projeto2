import ProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class Protocolo extends HTMLElement {
  constructor() {
    super();

    this.protocolo = {
      id: "",
      nome: "Carregando...",
      foto_url: "",
      ativo: 1,
    };

    this.shadow = this.attachShadow({ mode: "open" });

    console.log(this.getAttribute("protocolo-id"));

    this.protocolo_id = this.getAttribute("protocolo-id");
    console.log(this.getAttribute("protocolo-id"));

    console.log(this.protocolo_id);

    this.render();
  }

  async loadProtocolo() {
    if (!this.protocolo_id) {
      return;
    }
    const response = await fetch(
      `http://localhost:3334/protocolos/${this.protocolo_id}`
    );

    const protocolo = await response.json();

    console.log(protocolo);

    if (!protocolo) {
      return;
    }

    this.protocolo = {
      id: protocolo.protocolo_id,
      nome: protocolo.nome,
      foto_url: protocolo.foto_url,
      ativo: protocolo.ativo,
    };

    if (this.protocolo.foto_url) {
      this.render();
    }

    return protocolo;
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
        <section id="container">
          <div class="superior">
            <h1 class="text-3xl">${this.protocolo.nome}</h1>
  
            <div class="blocos">
              <div class="bloco">
                <h2>150<small>/500</small></h2>
                <span>Coletas</span>
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

    const exportar = this.shadowRoot.querySelector(".botoes h5");
    exportar.addEventListener("click", () => {
      console.log("Exportar");
      this.dispatchEvent(
        new CustomEvent("export-clicked", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    this.protocolo_id = this.getAttribute("protocolo-id");
    this.protocolo_id && this.loadProtocolo();
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, ProtocoloStyles];
    }
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("newValue, oldValue, name");
    console.log(newValue, oldValue, name);
    if (name === "protocolo-id") {
      console.log(newValue, oldValue, name);
      this.protocolo_id = newValue;
      this.loadProtocolo();
    }
  }
}

customElements.define("dendem-protocolo", Protocolo);
