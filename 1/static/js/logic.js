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
    function markersize(magnitude){
        return magnitude *4;
    };
   
    function getColor(magnitude){
        switch (true){
            case magnitude > 90:
                return "red";
            case magnitude > 70:
                return "redOrange";
            case magnitude > 50:
                return "orange";
            case magnitude > 30:
                return "gold";
            case magnitude > 10:
                return "yellow";
            default:
                return "blue";
            
        }
    }
    

L.geoJSON(earthquakeData,{
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng,{
            radius: markersize(feature.properties.mag),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            color:"red",
            stroke: true,
        }
        );
    },
    
    onEachFeature: function(feature,layer){
        layer.bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag}`);

    },

}).addTo(myMap);

var legend = L.control({position: "bottom right"});
legend.onAdd = function(){
    var div = L.DomUtil.create("div", "info legend"),
    depth = [5,4,3,2,1,0]
    div.innerHTML += "<h3 style = 'text-align: center'>Depth</h3>"
for (var i =0; i<depth.length; i++){
    div.innerHTML += 
    '<i style = background:' + getColor(depth[i]+1) + "></i" +
    depth[i] + (depth[i+1]? '&ndash;' + depth[i+1]+ '<br>': '+');
}
return div;
};
legend.addTo(myMap)});
var legend = L.control({
    position: "bottom right"
});





