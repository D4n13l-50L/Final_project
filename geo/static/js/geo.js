// map

var myMap = L.map("map", {
  center: [19.424135, -99.067266],
  zoom: 11
});

// tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "static/data/sectores.geojson";

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });


// mock tables 
// d3.select("tbody")
// .selectAll("tr")
// .data(austinWeather)
// .enter()
// .append("tr")
// .html(function(d) {
//   return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
// });