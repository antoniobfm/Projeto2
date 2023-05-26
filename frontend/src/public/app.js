const routes = [
  {
    path: "/",
    page: "/routes/home/index.html",
    script: "/routes/home/script.js",
  },
  {
    path: "/protocolos",
    page: "/routes/protocolos/index.html",
    script: "/routes/protocolos/script.js", 
    styles: ["/routes/protocolos/styles.css", "/components/Menu/styles.css", "/components/Menu/Button/styles.css"]
  },
  {
    path: "/coletores",
    page: "/routes/coletores/index.html",
    script: "/routes/coletores/script.js", 
    styles: ["/routes/coletores/styles.css"]
  },
  {
    path: "/login", 
    page: "/routes/login/index.html", 
    script: "/routes/login/script.js", 
    styles: ["/routes/login/styles.css"]
  },
];

const loadedStylesheets = [];

function preloadStylesheets() {
  // Preload the stylesheets for each route
  routes.forEach((route) => {
    if (route.styles) {
      route.styles.forEach((style) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = style;
        link.as = "stylesheet";
        document.head.appendChild(link);
      });
    }
  });
}

function navigateTo(url) {
  console.log('ok')
  history.pushState(null, null, url);

  router();
}

async function loadPage(path) {
  const response = await fetch(path);

  // Also load the page's scripts
  console.log(response);

  const content = await response.text();
  return content;
}

async function router() {
  const main = document.getElementById("main");


  const currentPath = location.pathname;

  const route = routes.find((r) => r.path === currentPath) || {
    page: "404.html",
  };

  if (route.script) {
    const script = document.createElement("script");
    script.src = route.script;
    script.type = "module";
    script.addEventListener("load", () => {
      // Wait for the script to finish loading before displaying the content
      main.innerHTML = content;
    });
    document.body.appendChild(script);
  } else {
    main.innerHTML = content;
  }

  const content = await loadPage(route.page);

  // Add the stylesheets for the new route
  route.styles.forEach((style) => {
    if (!loadedStylesheets.includes(style)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = style;
      document.head.appendChild(link);
      loadedStylesheets.push(style);

      // Wait for the stylesheet to finish loading before displaying the content
      link.addEventListener("load", () => {
        main.innerHTML = content;
      });
    }
  });

  // Remove the stylesheets for the old route
  const oldRoute = routes.find((r) => r.path === window.oldLocationPathname);
  if (oldRoute) {
    oldRoute.styles.forEach((style) => {
      if (loadedStylesheets.includes(style)) {
        const link = document.head.querySelector(`link[href="${style}"]`);
        document.head.removeChild(link);
        loadedStylesheets.splice(loadedStylesheets.indexOf(style), 1);
      }
    });
  }
  
  window.oldLocationPathname = currentPath;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

  window.addEventListener("popstate", router);
  preloadStylesheets();
  router();
});
