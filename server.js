const http = require('http');
const file = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  /* console.log(req.url, req.method); */

  //lodash
  const num = _.random(0, 20); //numero aleatorio entre 0 y 20
  console.log(num);

  const greet = _.once(() => {
    //con el _once permite que la funcion se ejecute SOLO una vez
    console.log('Hola');
  });

  greet();
  greet();

  //seteo la respuesta
  res.setHeader('Content-Type', 'text/html');

  //rutas
  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  file.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      /* res.write(data);
      res.end(); */
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('esperando conexion');
});
