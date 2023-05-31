class MyForm extends HTMLElement {
constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const form = document.createElement('form');
    form.action = '/formacoes/1';
    form.method = 'POST';
    form.addEventListener('submit', (event) => {
    event.preventDefault();
    createFormacao(form);
    });

    const nomeLabel = document.createElement('label');
    nomeLabel.textContent = 'Nome';
    form.appendChild(nomeLabel);

    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.name = 'nome';
    nomeInput.id = 'nome';
    nomeInput.required = true;
    form.appendChild(nomeInput);

    const descricaoLabel = document.createElement('label');
    descricaoLabel.textContent = 'Descrição';
    form.appendChild(descricaoLabel);

    const descricaoInput = document.createElement('input');
    descricaoInput.type = 'text';
    descricaoInput.name = 'descricao';
    descricaoInput.id = 'descricao';
    descricaoInput.required = true;
    form.appendChild(descricaoInput);

    const inicioLabel = document.createElement('label');
    inicioLabel.textContent = 'Inicio';
    form.appendChild(inicioLabel);

    const inicioInput = document.createElement('input');
    inicioInput.type = 'date';
    inicioInput.name = 'inicio';
    inicioInput.id = 'inicio';
    inicioInput.required = true;
    form.appendChild(inicioInput);

    shadow.appendChild(form);
}
}

customElements.define('my-form', MyForm);