import ProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class Protocolo extends HTMLElement {
  constructor() {
    super();

    this.protocolo = {
      id: "",
      nome: "Carregando...",
      descricao: "",
      foto_url: "",
      ativo: 1,
      etapas: [],
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
      `http://localhost:3334/protocolos/${this.protocolo_id}/campos`
    );

    const protocolo = await response.json();

    console.log(protocolo);

    if (!protocolo) {
      return;
    }

    this.protocolo = {
      id: protocolo.protocolo_id,
      nome: protocolo.nome,
      descricao: protocolo.descricao || "",
      foto_url: protocolo.foto_url,
      ativo: protocolo.ativo,
      etapas: protocolo.etapas,
    };

    if (this.protocolo.foto_url) {
      this.render();
    }

    console.log(this.protocolo);

    return protocolo;
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
        <section id="container">
          <div class="superior">
            <div class="superior__header">
              <h1 class="text-3xl">${this.protocolo.nome}</h1>
              <h5 class="text-base font-regular">${this.protocolo.descricao || ''}</h5>
            </div>
  
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

          <section id="collection-structure">
            <h3 class="text-xl font-bold">Estrutura de coleta</h3>
            <div id="collection-structure-blocks">

            </div>
          </section>
  
          <section id="itens">
            <div class="botoes">
              <h3 class="text-xl font-bold">Coletas</h3>
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

    const collectionStructure = template.content.querySelector(
      "#collection-structure-blocks"
    );

    this.protocolo.etapas.forEach((etapa) => {
      etapa.campos.forEach((campo) => {
        const campoElement = document.createElement("dendem-protocolo-structure");
        campoElement.setAttribute("campo", JSON.stringify(campo));
        collectionStructure.appendChild(campoElement);
      });
    });
    

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
    this.loadScripts();
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

  loadScripts() {
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "./routes/protocolos/Protocolo/Structure/index.js";
      this.shadowRoot.appendChild(script);
      console.log("Script loaded")
    }
  }
}

customElements.define("dendem-protocolo", Protocolo);
