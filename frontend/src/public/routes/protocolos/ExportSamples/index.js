// import styles from './styles.css';

// Define a new custom element called "ExportSamples"
class ExportSamples extends HTMLElement {
  constructor() {
    super();
    

    // Get the component's attributes
    // The attributes are defined in the HTML tag where the component is used
    // For example: 
    // <export-samples title="Exportar Amostras"></export-samples>
    const title = this.getAttribute('title');

    // Create a shadow root for the component
    // The shadow root encapsulates the component
    // Explanation of the shadow root: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a container for the component
    // The container is a <section> element
    // <section class="container"></section>
    const section = document.createElement('section');
    section.className = 'container';

    // Create the title
    // The title is a <h1> element
    // The title is defined in the component's attributes
    const h1 = document.createElement('h1');
    h1.textContent = title;
    h1.classList.add('text-3xl');
    section.appendChild(h1);

    // Create a div for the formats
    const divFormatos = document.createElement('div');
    divFormatos.className = 'formatos';
    section.appendChild(divFormatos);

    // Create the formats title
    const h2 = document.createElement('h2');
    h2.textContent = 'Formatos';
    h2.classList.add('text-lg');
    divFormatos.appendChild(h2);

    // Create a div for the buttons
    const divBotoes = document.createElement('div');
    divFormatos.appendChild(divBotoes);

    // Create the buttons
    const botoes = ['.XML', '.CSV', '.SQL'];
    
    // For each button, create a div
    botoes.forEach((botao) => {
      const divBotao = document.createElement('div');
      divBotao.onclick = () => {
        console.log('Clicou no botão', botao);
      };
      divBotao.className = 'botao';
      divBotao.textContent = botao;
      divBotoes.appendChild(divBotao);
    });

    
    // Load the component's CSS file
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './routes/protocolos/ExportSamples/styles.css';
    section.appendChild(styles);

    // Add the label and input elements to the container
    shadow.appendChild(section);
  }
}

// Define the custom element
customElements.define('export-samples', ExportSamples);
  
