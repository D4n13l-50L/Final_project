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

// Function that will determine the color of a neighborhood based on the delegacion it belongs to
function chooseColor(ddelegacion) {
  switch (ddelegacion) {
  case "VENUSTIANO CARRANZA":
    return "yellow";
  case "CUAUHTEMOC":
    return "red";
  case "MIGUEL HIDALGO":
    return "orange";
  case "IZTAPALAPA":
    return "green";
  case "AZCAPOTZALCO":
    return "purple";
  case 'GUSTAVO A MADERO':
    return 'blue';
  case 'COYOACAN':
    return 'grey';
  case 'BENITO JUAREZ':
    return 'teal';
  case 'IZTACALCO':
    return 'pink';
  case 'TLAHUAC':
    return 'brown';
  case 'MILPA ALTA':
    return 'fuchsia';
  case 'TLALPAN':
    return 'silver';
  case 'CUAJIMALPA':
    return 'lime';
  case 'ALVARO OBREGON':
    return 'olive';
  case 'MAGDALENA CONTRERAS':
    return 'navy';
  default:
    return "black";
  }
}

// GeoJSON data

d3.json(link).then(function(data) {

  L.geoJson(data, {
    style: function(feature){
      return {
        color: 'white',
        // call to the choosecolor funtion
        fillColor: chooseColor(feature.properties.delegacion),
        fillOpacity: 0.5,
        wight: 1.5
      };
    },
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      layer.bindPopup("<h1>" + feature.properties.delegacion + "</h1> <hr> <h2>" + feature.properties.delegacion + "</h2>");
    }
  }).addTo(myMap);
});

//var airbnb_csv = 'https://raw.githubusercontent.com/scmo-ops/data/main/coordinates.csv?token=ASYHR5BHYE5SGU3ZERIL6DTBFI4D4';

//  Grab Airbnb data
// d3.csv(airbnb_csv, function(data) {

//     console.log(data.id);
//     console.log(data.latitude);
//     console.log(data.longitude)
// });

// d3.csv(airbnb_csv).then(function(response) {

//   var markers = L.markerClusterGroup();

//   // Loop
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var lat = response[i].latitude;
//     var long = response[i].longitude;

//     // Check for location property
//     if (lat) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([lat, long])
//         .bindPopup(response[i].description));
//     }

//   };
// });