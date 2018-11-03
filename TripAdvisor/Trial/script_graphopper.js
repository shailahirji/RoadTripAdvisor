



$.getJSON("https://graphhopper.com/api/1/geocode?q=university+of+washington&locale=en&debug=true&key=1875e8b7-6821-424a-96fe-7d66b3246377",function(strt_loc){
    console.log(strt_loc)
    var long_strt= strt_loc.hits[0].extent[0];
    var lat_strt= strt_loc.hits[0].extent[1];
    var strt_coord=long_strt+","+lat_strt;
    $('.start_coord').append(strt_coord);
});

$.getJSON("https://graphhopper.com/api/1/geocode?q=Bellevue+Square+mall&locale=en&debug=true&key=1875e8b7-6821-424a-96fe-7d66b3246377",function(end_loc){
    console.log(end_loc)
    var long_end= end_loc.hits[0].extent[0];
    var lat_end= end_loc.hits[0].extent[1];
    var end_coord=long_end+","+lat_end;
    $('.end_coord').append(end_coord);
});

// var routing="https://graphhopper.com/api/1/route?point="+strt_coord+"&point="+end_coord+"&vehicle=car&locale=en&key=1875e8b7-6821-424a-96fe-7d66b3246377";








// $.getJSON(getCoords, function(data){
//     console.log(data)
// // var startdest= data.route.locations[0].street;
// // var enddest= data.route.locations[1].street;
// // var time=(parseInt(data.route.realTime))/60+"mins";
// // var fuel=data.route.fuelUsed+"mpg";
// // var miles=data.route.distance+"miles";
// // $('.start').append(startdest);
// // $('.end').append(enddest);
// // $('.time').append(time);
// // $('.fuel').append(fuel);
// // $('.miles').append(miles);
// }); 