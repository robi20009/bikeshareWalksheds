//Mapbox Token
var token = "pk.eyJ1Ijoicm9iaXZhbiIsImEiOiJjanR5bzg1aTEyMmE2NDRtcDFxNGMxa2lkIn0.zwWjUEJsG6MulroiUeq0Yg";
var minutes = "3"







    var map_0cd73d2330e74e1f904a0de933b2f592 = L.map(
        'map_0cd73d2330e74e1f904a0de933b2f592', {
        center: [38.932808, -77.03108],
        zoom: 15,
        maxBounds: bounds,
        layers: [],
        worldCopyJump: false,
        crs: L.CRS.EPSG3857,
        zoomControl: true,
        });
L.control.scale().addTo(map_0cd73d2330e74e1f904a0de933b2f592);




var bounds = null;

//Set style for stations that get added
function polystyle(feature) {
    return {
        fillColor: 'red',
        weight: 1,
        fillOpacity: 0.5,
        color: 'black',  //Outline color

    };
}

//Initialize popup variable
var popup = L.popup();

//Add station by right clicking
function onRightClick(e) {
    var link = $('<a href="#" class="speciallink">Add Station</a>').click(function() {
        onMapClick(e);
    })[0];
    L.popup()
    .setLatLng(e.latlng)
    .setContent(link)
    .openOn(map_0cd73d2330e74e1f904a0de933b2f592)
}

//Call station add function
map_0cd73d2330e74e1f904a0de933b2f592.on('contextmenu',onRightClick)

//Function to add station
function onMapClick(e) {
  map_0cd73d2330e74e1f904a0de933b2f592.closePopup();
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const myFtGrp = L.featureGroup().addTo(map_0cd73d2330e74e1f904a0de933b2f592);
  const iso = fetch("https://api.mapbox.com/isochrone/v1/mapbox/walking/" + lng + "," + lat + "?contours_minutes=" +
  minutes + "&polygons=true&access_token=" + token)
  .then((resp) => resp.json());
  iso.then(values => {
    L.geoJSON(values,{style: polystyle}).addTo(myFtGrp);
  ;})
  var popup1 = popup
    .setLatLng(e.latlng)
    .setContent((lng.toString() + ", " + lat.toString()))
    ;
  var marker = L.marker(e.latlng).addTo(myFtGrp);
var link = $('<a href="#" class="speciallink">Remove Station</a>').click(function() {
    myFtGrp.clearLayers();
})[0];
  marker.bindPopup(link);
  }






