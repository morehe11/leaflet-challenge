var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 2
  });



var graymap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
{
    attribution:
    "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
    }
  );
  
graymap.addTo(myMap)



var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
d3.json(baseURL).then(function(earthquakeData, err) {
    L.geoJson(earthquakeData,{
        pointToLayer: function(features, latlng){
            return L.circleMarker(latlng, {
                color: "red", 
                fillColor: getColor(latlng.alt),
                stroke: true, 
                
            }).bindPopup(function(earthquakeData){
                return `Location: ${features.properties.place}<br>Magnitude: ${features.properties.mag}`;
            })
        }
    }).addTo(myMap);
    function getColor(magnitude){
        switch (true){
            case magnitude > 5:
                return "red";;
            case magnitude > 4:
                return "redOrange";
            case magnitude > 3:
                return "orange";
            case magnitude > 2:
                return "gold";
            case magnitude > 1:
                return "yellow";
            default:
                return "blue";
            
        }
    }
});

var legend = L.control({
    position: "bottom left"
});

legend.onAdd = function(){
    var div = L.DomUtil.create("div", "info legend");

    var grades = [5,4,3,2,1];
    var colors = [
        "red",
        "redorange",
        "orange",
        "gold",
        "yellow",
        "blue"
    ];
    for (var i = 0; i<grades.length; i++){
        div.innerHTML += "<i style = 'backgroud : " + colors[i] + "></i"
        + grades[i] + (grades[i +1]? "&ndash;" + grades[i+1]+ "<br>": "+")
    }
    return div;
};

legend.addTo(myMap);




