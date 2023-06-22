import ColetorStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class Coletor extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["coletor-id"];
  }

  // Variaveis
  coletor_id = "";
  coletor = {
    id: "",
    nome: "",
    email: "",
    senha: "",
  };

  constructor() {
    super();

    // Cria um shadow root para o componente
    this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.loadStyles();
  }

  // Executa quando o elemento é removido do DOM
  disconnectedCallback() {
    console.log("disconnected Coletor");
  }

  // Lida com mudanças nos atributos do elemento
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "coletor-id") {
      this.coletor_id = newValue;

      // Recarrega o dados do coletor
      this.loadColetor();
    }
  }

  // Carrega os dados do coletor
  async loadColetor() {
    // Se não houver um coletor_id, não faz nada
    if (!this.coletor_id || this.coletor_id === "") {
      return;
    }

    // Busca o coletor
    const response = await fetch(
      `http://localhost:3334/coletores/${this.coletor_id}`
    );

    const coletor = await response.json();

    console.log(coletor);

    // Se não houver um coletor, não faz nada
    if (!coletor) {
      return;
    }

    // Atualiza o coletor
    this.coletor = {
      id: coletor.coletor_id,
      nome: coletor.nome,
      email: coletor.email,
      senha: coletor.senha,
    };

    // Renderiza o componente novamente
    if (this.coletor.nome) {
      this.render();
    }
  }

  // Renderiza o componente
  render() {
    // Cria um template
    const template = document.createElement("template");

    // Adiciona o HTML do componente ao template
    template.innerHTML = `
        <section id="container">
          <div class="superior">
            <div class="superior__header">
              <h1 class="text-3xl">${this.coletor.nome}</h1>
              <h5 class="text-base font-regular">
              Email: ${this.coletor.email || ""} <br /><br />
              Senha: ${this.coletor.senha || ""}
              </h5>
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

    // Adiciona o template ao shadow root
    this.shadowRoot.innerHTML = template.innerHTML;
  }

  // Carrega os estilos
  loadStyles() {
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, ColetorStyles];
    }
  }

  // Carrega os scripts
  loadScripts() {
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "./routes/coletores/Coletor/Structure/index.js";
      this.shadowRoot.appendChild(script);
      console.log("Script loaded");
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-coletor", Coletor);
