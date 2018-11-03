

$.getJSON("http://www.mapquestapi.com/directions/v2/route?key=HFGvQLiEUiDYTz4irsqSNx8mhX3x0aIz&from=University+Of+Washington,WA&to=Pike+Place+Market%2CSeattle%2C+WA&avoids=Limited+Access", function(data){
     console.log(data)
var startdest= data.route.locations[0].street;
var enddest= data.route.locations[1].street;
var time=(parseInt(data.route.realTime))/60+"mins";
var fuel=data.route.fuelUsed+"mpg";
var miles=data.route.distance+"miles";
$('.start').append(startdest);
$('.end').append(enddest);
$('.time').append(time);
$('.fuel').append(fuel);
$('.miles').append(miles);
}); 