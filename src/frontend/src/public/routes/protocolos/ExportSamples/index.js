import ExportSamplesStyles from "./styles.js";
import AppStyles from "../../../styles.js";

class ExportSamples extends HTMLElement {
  // Define quais atributos serão monitorados para alteração
  static get observedAttributes() {
    return ["title", "protocolo-id"];
  }

  // Variaveis
  title = '';
  protocolo_id = '';

  constructor() {
    super();

    // Cria um shadow root para o componente
    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });
  }

  // Executa assim que o elemento é inserido no DOM
  connectedCallback() {
    this.render();
    this.loadStyles();
  }

  // Lida com mudanças nos atributos definidos em observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.title = newValue;
    }

    if (name === "protocolo-id") {
      this.protocolo_id = newValue;
    }
  }

  render() {
    // Cria uma section para ser o container, adiciona a classe
    const section = document.createElement("section");
    section.className = "container";

    // Cria um h1 para o título, adiciona a classe e o conteudo, e adiciona ao container
    const h1 = document.createElement("h1");
    h1.textContent = this.title;
    h1.classList.add("text-3xl");
    section.appendChild(h1);

    // Cria um div para ser o container dos formatos, adiciona a classe e adiciona ao container
    const divFormatos = document.createElement("div");
    divFormatos.className = "formatos";
    section.appendChild(divFormatos);

    // Cria um h2 para o título dos formatos, adiciona a classe e o conteudo, e adiciona ao container
    const h2 = document.createElement("h2");
    h2.textContent = "Formatos";
    h2.classList.add("text-lg");
    divFormatos.appendChild(h2);

    // Cria um div para ser o container dos botões, adiciona a classe e adiciona ao container
    const divBotoes = document.createElement("div");
    divFormatos.appendChild(divBotoes);

    // Define os formatos
    const botoes = [".XML", ".CSV"];

    // Para cada formato, cria um botão e adiciona ao container
    botoes.forEach((botao) => {
      // Cria o botão
      const divBotao = document.createElement("div");
      divBotao.className = "botao";
      divBotao.textContent = botao;

      // Adiciona o evento de click ao botão
      divBotao.onclick = () => {
        this.download(botao);
      };

      // Adiciona o botão ao container
      divBotoes.appendChild(divBotao);
    });

    // Adiciona o container ao shadow root
    this.shadowRoot.appendChild(section);
  }

  // Faz o download do arquivo no formato especificado
  async download(type) {
    // Faz o download em CSV
    if (type === ".CSV") {
      await fetch("http://localhost:3334/amostras/csv/" + this.protocolo_id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const json = await response.json();
          return json;
        })
        .then((data) => {
          // Configura o cabeçalho do arquivo
          var encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent("");
    
          // Cria um link para o arquivo
          var link = document.createElement("a");
          link.href = encodedUri;
          link.download = "data.csv";
          link.innerHTML = "Download CSV";

          // Adiciona o link ao body
          document.body.appendChild(link);
          // Clica no link
          link.click();
          // Remove o link do body
          document.body.removeChild(link);
        });
      }

    if (type === ".XML") {
      // Faz o download em XML

      await fetch("xlsx/" + this.protocolo_id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const json = await response.json();
          return json;
        })
        .then((data) => {
          // Cria um blob com o conteudo do arquivo
          const blob = new Blob(["a"], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          // Cria uma URL para o arquivo
          const url = URL.createObjectURL(blob);
          
          // Cria um link para o arquivo
          const linkEx = document.createElement("a");
          linkEx.href = url;
          linkEx.download = "excel.xlsx";
          linkEx.innerHTML = "Download XLSX";

          // Adiciona o link ao body
          document.body.appendChild(linkEx);

          // Clica no link
          linkEx.click();

          // Remove a URL
          URL.revokeObjectURL(url);

          // Remove o link do body
          document.body.removeChild(linkEx);
        });
    }
  }
  
  // Carrega os estilos do componente
  loadStyles() {
    // Adiciona os estilos do componente ao shadow root, se não existirem
    if (!this.shadowRoot.adoptedStyleSheets.length) {
      this.shadowRoot.adoptedStyleSheets = [ExportSamplesStyles, AppStyles];
    }
  }
}

// Define o custom element na DOM
customElements.define("dendem-export-samples", ExportSamples);
