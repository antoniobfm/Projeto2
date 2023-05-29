class MySection extends HTMLElement {
    constructor() {
        super();
        let currentProtocolo = 'ativos';

        // Get from url query string the protocolo id
        const urlParams = new URLSearchParams(window.location.search);
        const protocoloId = urlParams.get('protocoloId');
        console.log(protocoloId);

        // Create a div element with the class "protocolos"
        const div = document.createElement("div");
        div.classList.add("protocolos");

        // Create an h2 element with the class "text-3xl" and text content "Protocolos"
        const h2 = document.createElement("h2");
        h2.classList.add("text-3xl");
        h2.textContent = "Protocolos";
        div.appendChild(h2);

        // Create a div element with the class "botoes"
        const botoesDiv = document.createElement("div");
        botoesDiv.classList.add("botoes");
        div.appendChild(botoesDiv);

        // Create a div element with the class "link" and "active", and text content "Ativos"
        const ativosDiv = document.createElement("div");
        ativosDiv.classList.add("link");
        ativosDiv.textContent = "Ativos";
        ativosDiv.addEventListener('click', () => {
            currentProtocolo = 'ativos';
            this.shadowRoot.innerHTML = '';
            this.connectedCallback();
        });
        botoesDiv.appendChild(ativosDiv);

        // Create a div element with the class "link", and text content "Finalizados"
        const finalizadosDiv = document.createElement("div");
        finalizadosDiv.classList.add("link");
        finalizadosDiv.textContent = protocoloId;
        finalizadosDiv.addEventListener('click', () => {
            currentProtocolo = 'finalizados';
            this.shadowRoot.innerHTML = '';
            this.connectedCallback();
        });
        botoesDiv.appendChild(finalizadosDiv);

        // Create a ul element with the class "lista"
        const listaUl = document.createElement("ul");
        listaUl.classList.add("lista");
        div.appendChild(listaUl);

        switch (currentProtocolo) {
            case 'ativos':
                ativosDiv.classList.add("active");
                break;

            case 'finalizados':
                finalizadosDiv.classList.add("active");
                break;
        }

        // Create a template element and append the div element to its content
        const template = document.createElement("template");
        template.content.appendChild(div);

        // Attach the shadow root to the custom element and append the template content to it
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Load the component's CSS file by creating a link element with the href attribute set to the CSS file path and appending it to the shadow root
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = './routes/protocolos/Lista/styles.css';
        this.shadowRoot.appendChild(styles);
    }

    async loadProtocolos() {
        const response = await fetch('http://localhost:3334/protocolos')
        .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
        
            // It is an array of
            // ativo: boolean
            // foto_url: string
            // nome: string
            // protocolo_id: number
    
            // Populate the ul element with the class "lista" with the protocolos
            const listaUl = this.shadowRoot.querySelector(".lista");
            
            data.forEach(protocolo => {
                const li = document.createElement("li");
    
                li.innerHTML = `${protocolo.nome}`;
    
                listaUl.appendChild(li);
            });
    
            // Append the ul element to the .protocolos div
            const div = this.shadowRoot.querySelector(".protocolos");
            div.appendChild(listaUl);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
    }

    // Call the loadProtocolos function when the component is connected to the DOM
    connectedCallback() {
        // Call your function here
        this.loadProtocolos();
    }
}



customElements.define("dendem-lista", MySection);