// Append Menu script to the page as module
const scriptMenu = document.createElement("script");
scriptMenu.src = "/components/Menu/index.js";
scriptMenu.type = "module";
document.body.appendChild(scriptMenu);

// Append the style
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "./routes/home/styles.css";
document.head.appendChild(style);