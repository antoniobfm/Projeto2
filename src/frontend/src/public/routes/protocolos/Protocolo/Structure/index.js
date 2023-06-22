import ProtocoloStructureStyles from "./styles.js";
import AppStyles from "../../../../styles.js";

class ProtocoloStructure extends HTMLElement {
  constructor() {
    super();

    this.protocolo = {
      id: "",
      nome: "Carregando...",
      descricao: "",
      foto_url: "",
      ativo: 1,
    };

    this.shadow = this.attachShadow({ mode: "open" });

    console.log(this.getAttribute("campo"));

    this.campo = JSON.parse(this.getAttribute("campo"));
    console.log(this.getAttribute("campo"));

    console.log('this.campo');
    console.log(this.campo);

    this.render();
  }

  render() {
    const template = document.createElement("template");
    if (this.campo && this.campo.nome) {
      template.innerHTML = `
        <div class="structure-item">
            <h3>${this.campo.nome}</h3>
            <div class="tag">
              <h5 class="text-xs font-regular">${this.campo.categoria}</h5>
            </div>
            
        </div>
      `;
    }
    //<p>${this.campo.descricao}</p>
    this.shadowRoot.innerHTML = template.innerHTML;
  }

  // Handle changes to the element's attributes
  connectedCallback() {
    this.campo = JSON.parse(this.getAttribute("campo"));
    console.log('this.campo')
    console.log(this.campo)

    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, ProtocoloStructureStyles];
    }
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("newValue, oldValue, name");
    console.log(newValue, oldValue, name);
    if (name === "protocolo") {
      console.log(newValue, oldValue, name);
      this.protocolo = newValue;
    }
  }
}

customElements.define("dendem-protocolo-structure", ProtocoloStructure);
