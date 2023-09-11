// Defines an array named ""routes", which contains information about the application's routes
// path: Caminho da rota
// page: Caminho para a página HTML correspondente à rota
// script: Caminho para o script JavaScript correspondente à rota
// styles: Caminhos para os arquivos de estilo CSS relacionados à rota
const routes = [
  {
    path: "/",
    page: "/routes/home/index.html",
    script: "/routes/home/script.js",
    styles: [
      "/routes/home/styles.css",
      "/components/Menu/styles.css",
      "/components/Menu/Button/styles.css",
      "/components/Menu/styles.css",
      "/routes/protocolos/Protocolo/styles.css",
    ],
  },
  {
    path: "/protocolos",
    page: "/routes/protocolos/index.html",
    script: "/routes/protocolos/script.js",
  },
  {
    path: "/coletores",
    page: "/routes/coletores/index.html",
    script: "/routes/coletores/script.js",
    styles: ["/routes/coletores/styles.css"],
  },
  {
    path: "/login",
    page: "/routes/login/index.html",
    script: "/routes/login/script.js",
    styles: ["/routes/login/styles.css"],
  },
  {
    path: "/c",
    page: "/routes/c/coletor/index.html",
    script: "/routes/c/coletor/script.js",
    styles: ["/routes/c/coletor/styles.css"],
  },
  {
    path: "/c/protocolo",
    page: "/routes/c/protocolo/index.html",
    script: "/routes/c/protocolo/script.js",
    styles: ["/routes/c/protocolo/styles.css"],
  },
];

function navigateTo(url) {
  history.pushState(null, null, url);

  router();
}

document.addEventListener("navigate-to", (e) => {
  navigateTo(e.detail);
});

async function loadPage(path) {
  const response = await fetch(path);

  // Also load the page's scripts
  const content = await response.text();
  return content;
}

// Carrega e exibe o conteúdo da página correspondente à rota atual no elemento HTML com o id "main"
async function router() {
  const main = document.getElementById("main");

  const currentPath = location.pathname;

  // Limpa o path para considerar parâmetros de URL
  const currentPathWithoutParams = currentPath.split("?")[0];
  console.log(currentPathWithoutParams)

  const route = routes.find((r) => r.path === currentPathWithoutParams) || {
    page: "404.html",
  };

  const content = await loadPage(route.page);

  main.innerHTML = content;

  window.oldLocationPathname = currentPath;
}

// Configures the application's internal link browsing
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

// Handles the browser history change event
  window.addEventListener("popstate", router);
  router();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then(() => {
      console.log('Service Worker Registered');
    }).catch((err) => {
      console.log('Service Worker Failed to Register', err);
    });
  })
}