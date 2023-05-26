class CustomButton extends HTMLElement {
    constructor() {
      super();
  
      // Get the component's attributes
      const label = this.getAttribute('label');
      const icon = this.getAttribute('icon');
  
      // Create a shadow root for the component
      const shadow = this.attachShadow({ mode: 'open' });

      // Include the main CSS file
      const linkMain = document.createElement('link');
      linkMain.rel = 'stylesheet';
      linkMain.href = './styles.css';
      shadow.appendChild(linkMain);
  
      // Create a button element
      const button = document.createElement('button');
      button.classList.add('text-base', 'font-bold', 'text-gray-900');
  
      // Copy the attributes from the original button element
      const attributes = this.attributes;
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name !== 'label' && attributes[i].name !== 'icon') {
          button.setAttribute(attributes[i].name, attributes[i].value);
        }
      }
  
      // Create a container for the button content
      const container = document.createElement('div');
      container.classList.add('button-container');
  
      // Create an SVG element for the icon
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '16');
      svg.setAttribute('height', '16');
      svg.setAttribute('viewBox', '0 0 16 16');
      svg.setAttribute('fill', 'none');
  
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '16');
      rect.setAttribute('height', '16');
      rect.setAttribute('fill', '#111827');
  
      svg.appendChild(rect);
  
      // Add the SVG to the container
      container.appendChild(svg);
  
      // Create a span element for the label
      const span = document.createElement('span');
      span.textContent = label;
  
      // Add the span to the container
      container.appendChild(span);
  
      // Move the button content into the container
      while (this.firstChild) {
        container.appendChild(this.firstChild);
      }
  
      // Add the container to the button
      button.appendChild(container);
  
      // Add the button to the shadow root
      shadow.appendChild(button);

      // Load the component's CSS file
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = './components/Menu/Button/styles.css';
      shadow.appendChild(link);

      // Load the app script
      const script = document.createElement('script');
      script.src = './app.js';
      shadow.appendChild(script);
    }

    static get observedAttributes() {
      return ['active-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(name)
      if (name === 'active-page') {
        if (newValue === this.getAttribute('page')) {
          this.shadowRoot.querySelector('button').classList.add('active');
        } else {
          this.shadowRoot.querySelector('button').classList.remove('active');
        }
      }
    }
  }
  
  // Define the custom element
  customElements.define('dendem-menu-button', CustomButton);