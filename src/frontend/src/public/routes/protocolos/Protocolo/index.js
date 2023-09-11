import ProtocoloStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class Protocolo extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["protocolo-id"];
  }

  // Variaveis
  protocolo_id = "";
  protocolo = {
    id: "",
    nome: "Carregando...",
    descricao: "",
    foto_url: "",
    ativo: 1,
    etapas: [],
  };

  constructor() {
    super();

    // Cria um shadow root para o componente
    this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadScripts();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "protocolo-id") {
      this.protocolo_id = newValue;

      // Recarrega o protocolo
      this.loadProtocolo();
    }
  }

  // Renderiza o componente
  render() {
    // Cria um template para o componente
    const template = document.createElement("template");

    // Define o HTML do template
    template.innerHTML = `
        <section id="container">
          <div class="superior">
            <div class="superior__header">
              <h1 class="text-3xl">${this.protocolo.nome}</h1>
              <h5 class="text-base font-regular">${
                this.protocolo.descricao || ""
              }</h5>
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

    // Adiciona os campos da estrutura de coleta do protocolo
    this.addCampos(template);

    // Adiciona o template ao shadow root
    this.shadowRoot.innerHTML = template.innerHTML;

    // Adiciona o event listener para o botão de exportar
    this.addExportSamplesEventListener();

    // Adiciona as amostras
    this.loadAmostras();
  }

  // Carrega o protocolo
  async loadProtocolo() {
    // Se não houver um protocolo_id, não faz nada
    if (!this.protocolo_id) {
      return;
    }

    // Busca o protocolo no servidor
    const response = await fetch(
      `http://localhost:3334/protocolos/${this.protocolo_id}/campos`
    );

    // Converte a resposta em JSON
    const protocolo = await response.json();

    // Se não houver um protocolo, não faz nada
    if (!protocolo) {
      return;
    }

    // Atualiza o protocolo
    this.protocolo = {
      id: protocolo.protocolo_id,
      nome: protocolo.nome,
      descricao: protocolo.descricao || "",
      foto_url: protocolo.foto_url,
      ativo: protocolo.ativo,
      etapas: protocolo.etapas,
    };

    // Renderiza o protocolo se houver uma foto, o que significa que o protocolo foi carregado
    if (this.protocolo.foto_url) {
      this.render();
    }
  }

  // Adiciona as coletas do protocolo
  async loadAmostras() {
    const response = await fetch(
      `http://localhost:3334/amostras/protocolo/${this.protocolo_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());


    // Busca o container que contém as coletas
    const collectionStructure = this.shadowRoot.querySelector(
      "#itens .content"
    );

    collectionStructure.innerHTML = "";

    // Unifica os campos em um array de campos para cada coleta, a partir da amostra_id
    const amostras = response.reduce((acc, amostra) => {
      // Busca o index da coleta atual
      const index = acc.findIndex((amostraAcc) => {
        return amostraAcc.amostra_id === amostra.amostra_id;
      });

      // Se a coleta não existir no array, adiciona ela
      if (index === -1) {
        acc.push({
          amostra_id: amostra.amostra_id,
          campos: [
            {
              ...amostra,
              campo_id: amostra.campo_id,
              nome: amostra.nome,
              conteudo: amostra.conteudo,
            },
          ],
        });
      } else {
        // Se a coleta já existir no array, adiciona o campo a ela
        acc[index].campos.push({
          ...amostra,
          campo_id: amostra.campo_id,
          nome: amostra.nome,
          conteudo: amostra.conteudo,
        });
      }

      return acc;
    }, []);
      
    console.log(amostras)
    // Para cada coleta
    amostras.forEach((coleta) => {
      // Define o container da coleta
      const amostraContainer = document.createElement("div");
      amostraContainer.classList.add("amostra-container");

      coleta.campos.forEach((amostra) => {

      // Define o elemento da coleta
      const amostraElement = document.createElement("dendem-protocolo-sample");

      // Define o atributo campo do elemento como o campo atual
      amostraElement.setAttribute("campo", JSON.stringify({
          campo_id: amostra.campo_id,
          nome: amostra.nome,
          categoria: amostra.conteudo
      }));

      // Adiciona o elemento ao container
      amostraContainer.appendChild(amostraElement);
    });

    // Adiciona o elemento ao container
    collectionStructure.appendChild(amostraContainer);
    });
  }

  // Adiciona os campos da estrutura de coleta do protocolo
  addCampos(template) {
    // Busca o container que contém os campos
    const collectionStructure = template.content.querySelector(
      "#collection-structure-blocks"
    );

    // Para cada etapa do protocolo
    this.protocolo.etapas.forEach((etapa) => {
      // Para cada campo da etapa
      etapa.campos.forEach((campo) => {
        // Define o elemento do campo
        const campoElement = document.createElement(
          "dendem-protocolo-structure"
        );

        // Define o atributo campo do elemento como o campo atual
        campoElement.setAttribute("campo", JSON.stringify(campo));

        // Adiciona o elemento ao container
        collectionStructure.appendChild(campoElement);
      });
    });
  }

  // Adiciona o event listener para o botão de exportar
  addExportSamplesEventListener() {
    // Busca o botão de exportar
    const exportar = this.shadowRoot.querySelector(".botoes h5");

    // Se o botão existir
    if (!!exportar)
    // Adiciona um evento de clique que dispara um evento customizado para o componente pai identificar que é para abrir o componente de exportar coletas
      exportar.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("export-clicked", {
            bubbles: true,
            composed: true,
          })
        );
      });
  }

  // Importa os scripts necessários para o componente
  loadScripts() {
    // Se eles ainda não foram importados, importa
    if (!this.shadowRoot.querySelector("script")) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "./routes/protocolos/Protocolo/Structure/index.js";
      this.shadowRoot.appendChild(script);

      const scriptSample = document.createElement("script");
      scriptSample.type = "module";
      scriptSample.src = "./routes/protocolos/Protocolo/Sample/index.js";
      this.shadowRoot.appendChild(scriptSample);
    }
  }

  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [AppStyles, ProtocoloStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-protocolo", Protocolo);
