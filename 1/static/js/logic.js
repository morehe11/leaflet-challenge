var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 2
  });
  
  

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap)




var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
d3.json(baseURL).then(function(earthquakeData, err) {
    L.geoJson(earthquakeData,{
        pointToLayer: function(features, latlng){
            return L.circleMarker(latlng, {
                color: "blue", 
                fillColor: getColor(latlng.alt),
                stroke: true, 
                
            }).bindPopup(function(earthquakeData){
                return `Location: ${features.properties.place}<br>Magnitude: ${features.properties.mag}`;
            })
        }
    }).addTo(myMap);
    function colorStyle(magnitude){
        var color = "";
        if (magnitude > 5){
            color = "#191970";
        }
        else if (magnitude > 4){
            color = "#000080"
        }
        else if (magnitude > 3){
            color = "#0000CD"
        }
        else if (magnitude > 2){
            color = "#0000FF"
        }
        else if (magnitude > 1){
            color = "#00CED1"
        }
        return 
            color;
    }
});

var legend = L.control({position: "bottomleft"});
legend.onAdd = function(myMap){
    var div = L.DomUtil.create("div", "info legend"),
        magnitude = [0,1,2,3,4,5],
        labels = [],
        from, to;

    div.innerHTML = labels.join('<br>');
    for (var i = 0; i<magnitude.length; i++){
        from = magnitude[i],
        to = magnitude[i +1];

        labels.push(
            '<i style="background:' + colorStyle(from + 1) + '"></i> ' +
				  from + (to ? '&ndash;' + to : '+'));
    }
    return div;
    };
    legend.addTo(myMap);  
}



