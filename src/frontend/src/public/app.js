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
];

function navigateTo(url) {
  console.log("ok");
  history.pushState(null, null, url);

  router();
}

document.addEventListener("navigate-to", (e) => {
  navigateTo(e.detail);
});

async function loadPage(path) {
  const response = await fetch(path);

  // Also load the page's scripts
  console.log(response);

  const content = await response.text();
  return content;
}

// Load and display the content of the page corresponding to the current route in the HTML element with the id "main"
async function router() {
  const main = document.getElementById("main");

  const currentPath = location.pathname;

  const route = routes.find((r) => r.path === currentPath) || {
    page: "404.html",
  };

  const content = await loadPage(route.page);

  // if (route.script) {
  //   // Clean up previously loaded scripts
  //   const oldScript =
  //     document.body && document.body.querySelector("script[type=module]");
  //   if (oldScript) {
  //     document.body.remove(oldScript);
  //   }

  //   const script = document.createElement("script");
  //   script.src = route.script;
  //   script.type = "module";
  //   script.addEventListener("load", () => {
  //     // Wait for the script to finish loading before displaying the content
  //     main.innerHTML = content;
  //   });
  //   document.body.appendChild(script);
  // } else {
  //   // Clean up previously loaded scripts
  //   const oldScript = document.body.querySelector("script[type=module]");
  //   if (oldScript) {
  //     document.body.removeChild(oldScript);
  //   }

  //   // Clean up previously loaded stylesheets
  //   const oldStylesheets = document.head.querySelectorAll(
  //     "link[rel=stylesheet]"
  //   );
  //   oldStylesheets.forEach((stylesheet) => {
  //     document.head.removeChild(stylesheet);
  //   });
  //   main.innerHTML = content;
  // }

  // Add the stylesheets for the new route

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

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//     .then(() => {
//       console.log('Service Worker Registered');
//     }).catch((err) => {
//       console.log('Service Worker Failed to Register', err);
//     });
//   })
// }