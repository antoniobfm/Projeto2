import "../../components/Input/index.js";

function login() {
  // Get the email and password values from the form
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // TODO: Add authentication logic here

  // Return false to prevent the form from submitting
  return false;
}

class Login extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    this.loadStyles();
  }

  render() {
    // O HTML abaixo é o que será renderizado dentro do elemento dendem-login
    const html = `
        <div class="container">
            <main>
                <img src="/assets/capa.png" />

                <div id="teladireita">
                    <h1 class="text-3xl">Seja bem-vindo!</h1>

                    <form onsubmit="login()">
                        <div>
                            <dendem-input id="nome" name="email" type="email" placeholder="" label="Email" ></dendem-input>
                            <dendem-input id="senha" type="password" name="senha" label="Senha" placeholder=""></dendem-input>
                        </div>

                        <div class="senha-acoes">
                            <div>
                                <input type="checkbox" id="lembrar">
                                <label for="lembrar">Lembrar-me</label>
                            </div>
                            <a href="#" id="esquecisenha">Esqueci a senha</a>
                        </div>
                        
                        <dendem-button navigate-to="protocolos" name="botao" type="submit" placeholder="" label="Entrar" ></dendem-button>
                    </form>
                </div>
            </main>
        </div>
    `;

    // Inserimos o HTML acima dentro do shadow root do elemento dendem-login
    this.shadow.innerHTML = html;
  }

  // Carrega os estilos do elemento dendem-login
  loadStyles() {
    if (!this.shadow.querySelector("link")) {
      // Append ExportSamples style to the page
      const style = document.createElement("link");
      style.href = "/routes/login/styles.css";
      style.rel = "stylesheet";
      this.shadow.appendChild(style);
    }
  }
}

// Aqui é onde o elemento dendem-login é definido
customElements.define("dendem-login", Login);
