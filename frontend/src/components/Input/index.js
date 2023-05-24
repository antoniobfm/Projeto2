// import path from 'path';

class InputComponent {
    constructor({ name, type, placeholder, label }) {
      this.name = name;
      this.type = type;
      this.placeholder = placeholder;
      this.label = label;
    }

  
    render() {
      // Create a container for the component
      const container = document.createElement('div');
      container.classList.add('input-container');

      // Create the label element
      const label = document.createElement('label');
      label.innerText = this.label;
      label.forHtml = this.name;
      label.classList.add('label');

      // Create the input element
      const input = document.createElement('input');
      input.name = this.name;
      input.type = this.type;
      input.placeholder = this.placeholder;
      input.classList.add('input');

      // Load the component's CSS file
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = './components/Input/styles.css'
      document.head.appendChild(link);

      // Add the label and input elements to the container
      container.appendChild(label);
      container.appendChild(input);

      // Return the container
      return container;
    }
  }
  
  // Example usage:
  // const input = new InputComponent('text', 'Enter your name');
  // document.querySelector('form').appendChild(input.render());

export default InputComponent