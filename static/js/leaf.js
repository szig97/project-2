// leaflet map lives here

// var mapWidth = d3.select('#map').property('offsetWidth');
// var mapHeight = 3 * mapWidth / 4;
// d3.select('#map').attr('width', mapWidth).attr('height', mapHeight);

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    // center: [37.09, -95.71],
    zoom: 4,
    layers: [lightmap]
});

lightmap.addTo(myMap);

function scaleBath(bath){
    return 2 * bath;
}

d3.json('/graphsdata').then( data => {
    console.log(data);
    // var bath = [];
    // for (i=0; i < data.length; i++) {
    //     bath.push(parseInt(data[i].bath));
    // }

    var bathCircles = [];

    const dataLength = data.length;
    for (let i=0; i< dataLength; i++) {
        const current = data[i];
        var bathCircle = L.circleMarker([current.latitude, current.longitude], {
            color:'black',
            fillColor: 'purple',
            radius: scaleBath(current.bath),
        });
        bathCircles.push(bathCircle);
    }
    L.layerGroup(bathCircles).addTo(myMap);

});