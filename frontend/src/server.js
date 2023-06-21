import http from 'http';
import path from 'path';
import fs from 'fs';
import express from 'express';

// Configures an Express server to handle HTTP requests and serve static files from the public directory
const __dirname = path.resolve();

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'src', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_DIR, {
  extensions: ['html', 'css', 'js'],
  setHeaders: (res, path) => {
    const extname = path.split('.').pop();
    console.log(getContentType('.' + extname))
    res.setHeader('Content-Type', getContentType('.' + extname));
  }
}));

// Adds GZIP compression to JavaScript files served by the Express server
app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

// Sets the "Content-Type" header of responses to CSS files to "text/css"
app.get('*.css', function(req, res, next) {
  res.set('Content-Type', 'text/css');
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// The "getContentType"" function maps a file's extension to the content type (MIME type), 
// used to configure the 'Content-Type' header in server responses
function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    default:
      return 'application/octet-stream';
  }
}