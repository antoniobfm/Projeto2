import InputComponent from '../../components/Input/index.js';

function login() {
    // Get the email and password values from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // TODO: Add authentication logic here

    // Return false to prevent the form from submitting
    return false;
}

const EmailInput = new InputComponent({
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    label: 'Email'
});

document.querySelector('form').appendChild(EmailInput.render());


const PasswordInput = new InputComponent({
    name: 'password',
    type: 'password',
    placeholder: 'Senha',
    label: 'Senha'
});

document.querySelector('form').appendChild(PasswordInput.render());
