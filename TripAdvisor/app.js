
var sygicMapsServices = require("sygic-maps-services");

//Or, when you only need to include compiled JS, you can use: 
//<script src="https://unpkg.com/sygic-maps-services/dist/sygic-maps-services.min.js"></script>

var mapServices = sygicMapsServices.create({
  key: '88uIu8H6xVy3DEbk8bKLxp2pm'
});

mapServices.geocode({
  country: 'Deutschland',
  city: 'Berlin',
  street: 'Bernauer Strasse',
  house_number: '12',
  zip: '13355',
  admin_level_1: 'Berlin'
}, (error, response) => {
  console.log(response);
  console.log(error);
});