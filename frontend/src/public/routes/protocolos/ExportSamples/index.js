// import styles from './styles.css';

class ExportSamples extends HTMLElement {
  constructor() {
    super();

    // Get the component's attributes
    const title = this.getAttribute('title');

    // Create a shadow root for the component
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a container for the component
    const section = document.createElement('section');
    section.className = 'container';

    // Create the title
    const h1 = document.createElement('h1');
    h1.textContent = title;
    h1.classList.add('text-3xl');
    section.appendChild(h1);

    const divFormatos = document.createElement('div');
    divFormatos.className = 'formatos';
    section.appendChild(divFormatos);

    const h2 = document.createElement('h2');
    h2.textContent = 'Formatos';
    h2.classList.add('text-lg');
    divFormatos.appendChild(h2);

    const divBotoes = document.createElement('div');
    divFormatos.appendChild(divBotoes);

    const botoes = ['.XML', '.CSV', '.SQL'];
    botoes.forEach((botao) => {
      const divBotao = document.createElement('div');
      divBotao.className = 'botao';
      divBotao.textContent = botao;
      divBotoes.appendChild(divBotao);
    });

    // Load the component's CSS file
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './routes/protocolos/ExportSamples/styles.css';

    // Add the label and input elements to the container
    section.appendChild(divFormatos);

    shadow.appendChild(section);
    shadow.appendChild(styles);
  }
}

// Define the custom element
customElements.define('export-samples', ExportSamples);