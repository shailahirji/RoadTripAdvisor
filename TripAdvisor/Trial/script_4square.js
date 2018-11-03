

// $.getJSON("'https://api.foursquare.com/v2/venues/explore?client_id=GE3OK1L3DMWU3MTKAKJY5JF3T0GTW2KQLY0HRFHOBWTN5NM2&client_secret=JFYUI2NSMXLPO3NPQGDQGBELDDQKFUHSPNM5LYUXBEYD4S0I&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee", function(data){
//     console.log(data)

// }); 

// fetch('https://api.foursquare.com/v2/venues/explore?client_id=GE3OK1L3DMWU3MTKAKJY5JF3T0GTW2KQLY0HRFHOBWTN5NM2&client_secret=JFYUI2NSMXLPO3NPQGDQGBELDDQKFUHSPNM5LYUXBEYD4S0I&v=20180323&limit=1&ll=47.652561,-122.300369&query=coffee')
//     .then(function(data) {
//         // Code for handling API response
//         console.log(data)
//     })
//     .catch(function() {
//         // Code for handling errors
//     });
function getFoursquare(){
    var url = "https://api.foursquare.com/v2/venues/explore?client_id=GE3OK1L3DMWU3MTKAKJY5JF3T0GTW2KQLY0HRFHOBWTN5NM2&client_secret=JFYUI2NSMXLPO3NPQGDQGBELDDQKFUHSPNM5LYUXBEYD4S0I&v=20180323&limit=1&ll=47.652561,-122.300369&query=coffee";
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data){
        console.log(data)
        var venues = data.response.venues;
        $.each(venues, function(i,venue){
          $('p').append(venue.name + '<br />');
          console.log(data)
        });
      }
    });
  };
  
  getFoursquare();