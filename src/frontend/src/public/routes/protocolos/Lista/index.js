import ListaStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class MySection extends HTMLElement {
  // Variaveis
  currentProtocolo = "ativos";
  protocolosAtivos = [];
  protocolosFinalizados = [];

  constructor() {
    super();

    // Cria um shadow root para o componente
    this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Renderiza o componente
  render() {
    // Create a container div element with the class "protocolos"
    this.container = document.createElement("div");
    this.container.classList.add("protocolos");

    // Create a div for the header, including h2 and buttonsDiv
    this.header = document.createElement("div");
    this.header.classList.add("header");
    this.container.appendChild(this.header);

    // Create an h2 element with the class "text-3xl" and text content "Protocolos"
    const h2 = document.createElement("h2");
    h2.classList.add("text-3xl");
    h2.textContent = "Protocolos";
    this.header.appendChild(h2);

    // Create a div element with the class "botoes"
    this.botoesDiv = document.createElement("div");
    this.botoesDiv.classList.add("botoes");
    this.header.appendChild(this.botoesDiv);

    // Create a ul element with the class "lista"
    this.listaUl = document.createElement("ul");
    this.listaUl.classList.add("lista");
    this.container.innerHTML += this.listaUl.outerHTML;

    // Create a template element and append the div element to its content
    const template = document.createElement("template");
    template.content.appendChild(this.container);

    // Remove previous rendered content
    const previousContent = this.shadowRoot.querySelector("div");

    if (!!previousContent) {
      previousContent.remove();
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.renderMenu();
    this.loadProtocolos();
    this.loadScripts();

    this.addEventListenerForProtocolCreated();
    this.addEventListenerForBotoes();
  }

  // Renderiza os botões finalizados e ativos
  renderMenu() {
    // Busca o container dos botões
    const botoesDiv = this.shadowRoot.querySelector(".botoes");

    // Remove os botões anteriores
    if (!!botoesDiv) {
      botoesDiv.remove();
    }

    // Cria um novo container de botões e adiciona a classe "botoes"
    const newBotoesDiv = document.createElement("div");
    newBotoesDiv.classList.add("botoes");

    // Cria um div para ativos com a classe "link" e "active", e o texto "Ativos"
    const ativosDiv = document.createElement("div");

    ativosDiv.classList.add("link");
    ativosDiv.setAttribute("shadow-id", "ativos");
    ativosDiv.textContent = "Ativos";

    // Adiciona um evento de click ao div de ativos
    ativosDiv.onclick = () => {
      this.currentProtocolo = "ativos";
      this.renderMenu();
    };

    // Adiciona o div de ativos ao container de botões
    newBotoesDiv.appendChild(ativosDiv);

    // Cria um div para finalizados com a classe "link" e o texto "Finalizados"
    const finalizadosDiv = document.createElement("div");
    
    finalizadosDiv.classList.add("link");
    finalizadosDiv.setAttribute("shadow-id", "finalizados");
    finalizadosDiv.textContent = "Finalizados";

    // Adiciona um evento de click ao div de finalizados
    finalizadosDiv.onclick = () => {
      this.currentProtocolo = "finalizados";
      this.renderMenu();
    };

    newBotoesDiv.appendChild(finalizadosDiv);

    // Adiciona a classe "active" ao div de acordo com a aba selecionada
    switch (this.currentProtocolo) {
      case "ativos":
        ativosDiv.classList.add("active");
        break;

      case "finalizados":
        finalizadosDiv.classList.add("active");
        break;
    }

    // Adiciona o container de botões ao header
    this.shadowRoot.querySelector(".header").appendChild(newBotoesDiv);

    // Renderiza a lista de protocolos novamente para atualizar a lista de protocolos
    this.changeTab();
  }

  // Muda a aba de ativos para finalizados e vice-versa
  changeTab() {
    // Busca a lista de protocolos
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Se a lista de protocolos existir
    if (!!listaUlShadow) {
      // Limpa a lista para renderizar novamente e não duplicar os protocolos
      listaUlShadow.innerHTML = "";
    }

    // Cria uma nova lista de protocolos
    const newListaUl = document.createElement("ul");

    // Se o protocolo atual for ativos
    if (this.currentProtocolo === "ativos") {
      this.protocolosAtivos.forEach((protocolo) => {
        const listaItem = document.createElement("dendem-lista-item");

        // Send attribute to ListaItem component
        listaItem.setAttribute("name", protocolo.nome);
        listaItem.setAttribute("protocolo-id", protocolo.protocolo_id);

        newListaUl.appendChild(listaItem);
      });
    } else {
      // Se o protocolo atual for finalizados
      // Busca os protocolos finalizados
      this.protocolosFinalizados.forEach((protocolo) => {
        // Cria um novo protocolo 
        const listaItem = document.createElement("dendem-lista-item");

        // Adiciona os atributos ao protocolo
        listaItem.setAttribute("name", protocolo.nome);
        listaItem.setAttribute("protocolo-id", protocolo.protocolo_id);

        // Adiciona o protocolo à lista de protocolos
        newListaUl.appendChild(listaItem);
      });
    }

    // Renderiza a lista de protocolos 
    this.shadowRoot.querySelector(".lista").innerHTML = newListaUl.innerHTML;
  }

  // Carrega os protocolos
  async loadProtocolos() {
    // Faz a requisição para a API para buscar os protocolos
    const response = await fetch("http://localhost:3334/protocolos").then(
      (response) => {
        return response.json();
      }
    ).catch((error) => {
      console.log(error);
    });

    // Limpa os protocolos ativos e finalizados
    this.protocolosAtivos = [];
    this.protocolosFinalizados = [];

    // Adiciona os protocolos ativos e finalizados
    response.forEach((protocolo) => {
      if (!!protocolo.ativo) {
        this.protocolosAtivos.push(protocolo);
      } else {
        this.protocolosFinalizados.push(protocolo);
      }
    });

    // Renderiza o menu novamente
    this.changeTab();
  }

  // Adiciona o event listener para os botões
  addEventListenerForBotoes() {
    // Busca o botão referente aos protocolos ativos
    const ativosShadow = this.shadowRoot.querySelector('[shadow-id="ativos"]');

    // Se o botão existir
    if (!!ativosShadow)
      // Adiciona o event listener que muda o protocolo atual para "ativos"
      ativosShadow.addEventListener("click", () => {
        this.currentProtocolo = "ativos";
        this.renderMenu();
      });

    // Busca o botão referente aos protocolos finalizados
    const finalizadosShadow = this.shadowRoot.querySelector(
      '[shadow-id="finalizados"]'
    );

    // Se o botão existir
    if (!!finalizadosShadow)
      // Adiciona o event listener que muda o protocolo atual para "finalizados"
      finalizadosShadow.addEventListener("click", () => {
        this.currentProtocolo = "finalizados";
        this.renderMenu();
      });
  }

  // Adiciona o event listener para o evento "protocol-created"
  addEventListenerForProtocolCreated() {
    // Busca o elemento ul que contém os protocolos
    const listaUlShadow = this.shadowRoot.querySelector(".lista");

    // Se a lista existir
    if (!!listaUlShadow) {
      // Adiciona o event listener
      this.getRootNode().addEventListener("protocol-created", async () => {
        await this.loadProtocolos();
      });
    }
  }

  // Importa os scripts necessários para o componente
  loadScripts() {
    // Se eles ainda não foram importados, importa
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "./routes/protocolos/Lista/ListaItem/index.js";
      script.type = "module";
      this.shadowRoot.appendChild(script);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ListaStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-lista", MySection);
