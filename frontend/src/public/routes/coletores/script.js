// Append ExportSamples script to the page as module
const script = document.createElement('script');
script.src = '/routes/protocolos/ExportSamples/index.js';
script.type = 'module';
document.body.appendChild(script);

console.log('ExportSamples script loaded')

// Append Menu script to the page as module
const scriptMenu = document.createElement('script');
scriptMenu.src = '/components/Menu/index.js';
scriptMenu.type = 'module';
document.body.appendChild(scriptMenu);

console.log('Menu script loaded')