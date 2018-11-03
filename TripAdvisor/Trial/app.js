
// var sygicMapsServices = require("sygic-maps-services");

// //Or, when you only need to include compiled JS, you can use: 
// //<script src="https://unpkg.com/sygic-maps-services/dist/sygic-maps-services.min.js"></script>

// var mapServices = sygicMapsServices.create({
//   key: '88uIu8H6xVy3DEbk8bKLxp2pm'
// });

// mapServices.geocode({
//   country: 'Deutschland',
//   city: 'Berlin',
//   street: 'Bernauer Strasse',
//   house_number: '12',
//   zip: '13355',
//   admin_level_1: 'Berlin'
// }, (error, response) => {
//   console.log(response);
//   console.log(error);
// });


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

