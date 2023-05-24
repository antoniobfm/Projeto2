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
  const routes = [
    {
      path: "/",
      page: "/home/index.html",
      script: "/home/script.js",
    },
    {
      path: "/about",
      page: "/about/index.html", 
      script: "/about/script.js", 
      styles: "/routes/about/styles.css"
    },
    { 
      path: "/contact", 
      page: "/contact/index.html", 
      script: "/contact/script.js", 
      styles: "/routes/contact/styles.css" 
    },
    { 
      path: "/login", 
      page: "/login/index.html", 
      script: "/login/script.js", 
      styles: "/routes/login/styles.css" 
    },
  ];

  const currentPath = location.pathname;

  const route = routes.find((r) => r.path === currentPath) || {
    page: "404.html",
  };

  if (route.script) {
    document.body.appendChild(
      Object.assign(document.createElement("script"), {
        src: route.script,
        type: "module"
      })
    );

    document.head.appendChild(
      Object.assign(document.createElement("link"), {
        rel: "stylesheet",
        href: route.styles,
      })
    );
  }

  main.innerHTML = await loadPage(route.page);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

  window.addEventListener("popstate", router);
  router();
});
