// import styles from './styles.css';

// Define a new custom element called "ExportSamples"
class ExportSamples extends HTMLElement {
  constructor() {
    super();

    const title = this.getAttribute("title");

    const shadow = this.attachShadow({ mode: "open" });

    const section = document.createElement("section");
    section.className = "container";

    const h1 = document.createElement("h1");
    h1.textContent = title;
    h1.classList.add("text-3xl");
    section.appendChild(h1);

    // Create a div for the formats
    const divFormatos = document.createElement("div");
    divFormatos.className = "formatos";
    section.appendChild(divFormatos);

    // Create the formats title
    const h2 = document.createElement("h2");
    h2.textContent = "Formatos";
    h2.classList.add("text-lg");
    divFormatos.appendChild(h2);

    // Create a div for the buttons
    const divBotoes = document.createElement("div");
    divFormatos.appendChild(divBotoes);

    // Create the buttons
    const botoes = [".XML", ".CSV", ".SQL"];

    // For each button, create a div
    botoes.forEach((botao) => {
      const divBotao = this.createButton(botao);

      divBotao.onclick = () => {
        this.download(botao);
      };

      divBotoes.appendChild(divBotao);
    });

    // Load the component's CSS file
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "./routes/protocolos/ExportSamples/styles.css";
    section.appendChild(styles);

    // Add the label and input elements to the container
    shadow.appendChild(section);
  }

  async download(type) {
    if (type === ".CSV") {
          var encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent('');
          var link = document.createElement("a");
          link.href = encodedUri;
          link.download = "data.csv";
          link.innerHTML = "Download CSV";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return;
      await fetch("http://localhost:3334/amostras/csv", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const json = await response.json();
          // ⚠️ Tem que transformar em blob? ⚠️
          return json;
        })
        .then((data) => {
          var encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
          var link = document.createElement("a");
          link.href = encodedUri;
          link.download = "data.csv";
          link.innerHTML = "Download CSV";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    }

    if (type === ".XML") {
      const blob = new Blob(['a'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const linkEx = document.createElement('a');
      linkEx.href = url;
      linkEx.download = "excel.xlsx";
      linkEx.innerHTML = "Download XLSX"
      linkEx.click();
      URL.revokeObjectURL(url);
      return;
      await fetch("dados/excel", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const json = await response.json();
          return json;
        })
        .then((data) => {
          console.log(data.exc);
          downloadFile(data.exc);
        });

      return;
    }

    if (type === ".SQL") {
      const blob = new Blob(['a'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const linksq = document.createElement('a');
      linksq.href = url;
      linksq.download = "data.sql";
      linksq.style.display = 'none';
      document.body.appendChild(linksq);
      linksq.click();
      setTimeout(function() {
        URL.revokeObjectURL(url);
        document.body.removeChild(linksq);
      }, 100);
      return;
      await fetch("dados/csql", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const json = await response.json();
          return json;
        })
        .then((data) => {
          console.log("////////////////");
          console.log(data.sql);
          downloadSQL(data.sql);
        });
    }
  }

  createButton(botao) {
    const divBotao = document.createElement("div");
    divBotao.onclick = () => {
      console.log("Clicou no botão", botao);
    };
    divBotao.className = "botao";
    divBotao.textContent = botao;
    return divBotao;
  }
}

// Define the custom element
customElements.define("dendem-export-samples", ExportSamples);
