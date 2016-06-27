

function setStops() { 
}

function setStations(stops) {
  var template="";
  for(var i=0;i<stops.length;i++) {
    if (stops[i]!="undefined") {
      template+='<option value="'+stops[i].name+'">'+stops[i].id+'</option>';
    }
  }
  console.log(template);
  $("#locationFrom").html(template);
  $("#locationTo").html(template);
}
function displayStations(stops) {
  var template="";
  for(var i=0;i<stops.length;i++) {
    if (stops[i]!="undefined") {
      template+='<a href="" class="list-group-item">'+stops[i].name+'</a>';
      $("#stations").html(template);
    }
  }
}

$(document).ready(function() {
    var stops = getStops();
    console.log(stops);
});

function getStops() {
    var stops = Promise.resolve($.ajax("/data/stops.txt"));
    return stops;
    $(".locationFrom").html();
}



                // var stops = xhr.split('\n');
                // // stops = JSON.stringify(stops);
                // var new_stop = [];
                // var transportation = [];
                // var stop_id = stop_name = stop_lat = stop_lon = zone_id = "";

                // for(var i=0;i<stops.length;i++) {
                //     stop = stops[i].split(",");
                //     if (i==0) { // Set the keys
                //       stop_id = stop[0];
                //       stop_name = stop[1];
                //       stop_lat = stop[2];
                //       stop_long = stop[3];
                //       stop_zone_id = stop[4];
                //     } else { // Set the values
                //       // new_stop[i] = 
                //       new_stop.push({
                //         id: stop[0],
                //         name: stop[1],
                //         lat: stop[2],
                //         long: stop[3],
                //         zone_id: stop[4]
                //       });
                //       var splitName = stop[1].split(" - ");
                //       console.log(splitName);
                //       transportation.push(name[0])
                //     }
                // }
                // // console.log(stops.length);
                // // console.log(stops);
                // // console.log(transportation);
                // setStations(new_stop);
                // displayStations(new_stop);
                // // console.log(stop_id, stop_name,stop_lat,stop_long,stop_zone_id);
                // // console.log(stops[i].stop_id);
