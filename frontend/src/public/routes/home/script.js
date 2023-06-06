// Append Menu script to the page as module
const scriptMenu = document.createElement('script');
scriptMenu.src = '/components/Menu/index.js';
scriptMenu.type = 'module';
document.body.appendChild(scriptMenu);

console.log('Menu script loaded')