// leaflet map lives here
console.log('leaf.js loaded');

// var mapWidth = d3.select('.well').property('width');
// var mapHeight = 3 * mapWidth / 4;
// d3.select('#map').attr('width', mapWidth).attr('height', mapHeight);

// ========================================
// Start where the Map is built

function buildMapContianer() {

    var leafMap;

    var aController;

    var aBathLayer;

    var aBedLayer;

    var aPriceLayer;

    var circleMapBox;

    function buildMap(baths, beds, price, STData = null) {

        console.log(STData);

        if (STData !== null) {

            console.log(+STData.latitude);

            leafMap.setView(new L.LatLng(+STData.latitude, +STData.longitude), STData.zoomin);

            leafMap.removeControl(aController);

            leafMap.removeLayer(aBathLayer);

            leafMap.removeLayer(aBedLayer);

            leafMap.removeLayer(aPriceLayer)

            aBathLayer = baths;
            aBedLayer = beds;
            aPriceLayer = price;

            leafMap.addLayer(baths);

            circleMapBox = {
                'Baths': baths,
                'Beds': beds,
                'Price': price
            };

            aController = L.control.layers(circleMapBox, null, { collapsed: false });
            aController.addTo(leafMap);

        } else {

            var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                tileSize: 512,
                maxZoom: 18,
                zoomOffset: -1,
                id: "mapbox/light-v10",
                accessToken: API_KEY
            });
            leafMap = L.map("map", {
                center: [37.0902, -95.7129],
                zoom: 4,
                layers: [lightmap, baths]
            });

            let circleMapBox = {
                'Baths': baths,
                'Beds': beds,
                'Price': price
            };

            aBathLayer = baths;
            aBedLayer = beds;
            aPriceLayer = price;

            aController = L.control.layers(circleMapBox, null, { collapsed: false });
            aController.addTo(leafMap);

            console.log(typeof (leafMap));
        }


    }

    return buildMap;
}

var buildMap = buildMapContianer();

// End where Map is built
// ============================================================


// ==========================================================
// Start Where Circle Layers Are Drawn and Built

function createMarkers(gData, STData = null) {
     
    console.log('STData');
    console.log(STData);
    // =====================================
    // Scalers and Variables

    // setting length of data for for loops
    const dataLength = gData.length;


    function Popcorn(Korn) {
        const htmlString = ('<h6>' + Korn.address + '</h6><p>Price: ' + Korn.price + 
            '</p><p>Sqrft: ' + Korn.sqrft + '</p><p>Beds: ' + Korn.beds + '</p><p>Baths: ' + Korn.bath + '</p>');

        return htmlString;
    }


    function scaleBedBath(room) {
        if (STData !== null && STData.state !== 'USA') {
            return 2 * room;
        } else {
            return 1 * room;
        }
    }

    function scalePrice(money) {
        return Math.log(money) / 2;
    }


    let transparency = .1;
    if (STData !== null && STData.state !== 'USA') {
        transparency = .4;
    }

    const bedColor = 'pink';

    const bathColor = 'lightblue';

    const priceColor = 'lightgreen';

    // ============================


    // ================================
    // circles for Beds


    let bedCircles = [];

    for (let i = 0; i < dataLength; i++) {
        const current = gData[i];
        let bedCircle = L.circleMarker([current.latitude, current.longitude], {
            color: bedColor,
            fillColor: bedColor,
            radius: scaleBedBath(current.beds),
            fillOpacity: transparency,
            opacity: transparency
        });

        if (STData !== null && STData.state !== 'USA') {
            bedCircle.bindPopup(Popcorn(current));
        }

        bedCircles.push(bedCircle);
    }
    let bedCircleLayer = L.layerGroup(bedCircles);

    // ===================================

    // ================================
    // circles for Baths

    var bathCircles = [];

    for (let i = 0; i < dataLength; i++) {
        const current = gData[i];
        var bathCircle = L.circleMarker([current.latitude, current.longitude], {
            color: bathColor,
            fillColor: bathColor,
            radius: scaleBedBath(current.bath),
            fillOpacity: transparency,
            opacity: transparency
        });

        if (STData !== null && STData.state !== 'USA') {
            bathCircle.bindPopup(Popcorn(current));
        }

        bathCircles.push(bathCircle);
    }
    let bathCircleLayer = L.layerGroup(bathCircles);
    // ===================================

    // ====================================
    // circles for Price

    let priceCircles = [];

    for (let i = 0; i < dataLength; i++) {
        const current = gData[i];
        var priceCircle = L.circleMarker([current.latitude, current.longitude], {
            color: priceColor,
            fillColor: priceColor,
            radius: scalePrice(current.price),
            fillOpacity: transparency,
            opacity: transparency
        });

        if (STData !== null && STData.state !== 'USA') {
            priceCircle.bindPopup(Popcorn(current));
        }

        priceCircles.push(priceCircle);
    }

    let priceCircleLayer = L.layerGroup(priceCircles);
    // =====================================

    // buildMap(bathCircleLayer, bedCircleLayer);

    buildMap(bathCircleLayer, bedCircleLayer, priceCircleLayer, STData);

}

// End where Circles are Drawn and Built
// =========================================================

// ========================================================
// Start Where Map is Initialized

function initMap() {
    benji.json('/graphsdata', gData => {
        console.log(gData);

        filtData = gData.filter(g => (g.price !== "Contact For Price" && g.price !== "Contact For Estimate"))

        console.log(d3.extent(filtData.map(d => d.bath)));
        console.log(d3.extent(filtData.map(d => d.beds)));
        console.log(d3.extent(filtData.map(d => d.price)));

        createMarkers(filtData);

        console.log('Done');
    });
}

initMap();

// End where Map is Initialized
// ========================================================

// =======================================================
// Start Where Change is Handled

function reMap(ST) {
    benji.json('/statesdata', sData => {
        benji.json('/graphsdata', gData => {

            let filtgData;

            let filtsData = 
                {
                    latitude: 37.0902, 
                    longitude: -95.7129,
                    name: 'United States of America',
                    state: 'USA',
                    zoomin: 4
                };

            if (ST === 'USA') {

                filtgData = gData;

            } else {

                filtgData = gData.filter(g => (g.price !== "Contact For Price" && g.price !== "Contact For Estimate")).filter(d => d.state === ST);
                filtsData = sData.filter(g => (g.price !== "Contact For Price" && g.price !== "Contact For Estimate")).find(d => d.state === ST);
                let filtzLevel = zoomLevels.filter(g => (g.price !== "Contact For Price" && g.price !== "Contact For Estimate")).find(d => d.state === ST);

                filtsData.zoomin = filtzLevel.zoomin;

            }

            createMarkers(filtgData, filtsData);
            console.log(filtgData);
        });
    });
}

// End where Change is Handled
// ========================================================


function optionChanged(ST) {
    reMap(ST);
}

