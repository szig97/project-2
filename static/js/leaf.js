// leaflet map lives here (Andy McRae)
console.log('leaf.js loaded');

// ========================================
// Start where the Map is built

// This function (buildMapContainer) is a closure around buildmap.
function buildMapContainer() {

    // ------------------------------------------
    // anchors that buildMaps can access over and over.
    var leafMap;

    var aController;

    var aBathLayer;

    var aBedLayer;

    var aPriceLayer;

    var aFootLayer;

    var circleMapBox;
    // --------------------------------------------

    function buildMap(baths, beds, price, ft, STData = null) {

        // console.log(STData);

        console.log('FT');
        console.log(ft);

        if (STData !== null) {

            // moving map and zooming in/out
            leafMap.setView(new L.LatLng(+STData.latitude, +STData.longitude), STData.zoomin);

            // ---------------------------------
            // destroying layers
            leafMap.removeControl(aController);

            leafMap.removeLayer(aBathLayer);

            leafMap.removeLayer(aBedLayer);

            leafMap.removeLayer(aPriceLayer);

            leafMap.removeLayer(aFootLayer);
            // --------------------------------

            // ----------------------
            // updating anchor layer
            aBathLayer = baths;
            aBedLayer = beds;
            aPriceLayer = price;
            aFootLayer = ft;
            // ---------------------

            // --------------------------
            // re-adding layers
            leafMap.addLayer(price);

            circleMapBox = {
                'Price': price,
                'Sqr Ft': ft,
                'Beds': beds,
                'Baths': baths
            };

            aController = L.control.layers(circleMapBox, null, { collapsed: false });
            aController.addTo(leafMap);
            // --------------------------


        } else {

            // map tile layer
            var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                tileSize: 512,
                maxZoom: 18,
                zoomOffset: -1,
                id: "mapbox/light-v10",
                accessToken: API_KEY
            });

            // creates map centered on center of USA, with layer of Baths
            leafMap = L.map("map", {
                center: [37.0902, -95.7129],
                zoom: 4,
                layers: [lightmap, price]
            });

            // Layers to be put in control
            let circleMapBox = {
                'Price': price,
                'Sqr Ft': ft,
                'Beds': beds,
                'Baths': baths
            };

            // -------------------------
            // updating anchors
            aBathLayer = baths;
            aBedLayer = beds;
            aPriceLayer = price;
            aFootLayer = ft;
            // -----------------------

            // creating control
            aController = L.control.layers(circleMapBox, null, { collapsed: false });
            // adding control
            aController.addTo(leafMap);

        }


    }

    return buildMap;
}

var buildMap = buildMapContainer();

// End where Map is built
// ============================================================


// ==========================================================
// Start Where Circle Layers Are Drawn and Built

function createMarkers(gData, STData = null) {

    // =====================================
    // Scalers and Variables

    // setting length of data for for loops
    const dataLength = gData.length;

    // =========================================================
    // This is the function Popcorn its purpose is to create the string
    // that will populate the popup on the circles
    function Popcorn(Korn) {

        // ------------------------------------------------------------------
        // got numberWithCommas function here https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        // this function that i found puts commas at the thousands places
        // -------------------------------------------------------------------

        // This adds some flavor to the price giving it commas and $ symbol
        let priceString = `$${numberWithCommas(Math.round(Korn.price))}`;

        // adds flavor to sqrft
        let sqrftString = `${numberWithCommas(Korn.sqrft)}sq ft`;

        // round year built so there is not .0 at the end
        let yrString = `${Math.round(Korn.yearbuilt)}`

        // compiles html string that will one day populate the popups
        const htmlString = ('<h6>' + Korn.address + '</h6><p>Price: ' + priceString +
            '</p><p>Sqrft: ' + sqrftString + '</p><p>Beds: ' + Korn.beds + '</p><p>Baths: ' + Korn.bath + '</p><p>Year Built: ' + yrString + '</p>');

        return htmlString;
    }
    // =========================================================

    // this is the scale for bed and bath radii
    function scaleBedBath(room) {

        // Doing this to make map easier to look at
        // Still get the picture that there are a lot of rooms.
        if (room > 10) {
            room = 10;
        }

        if (STData !== null && STData.state !== 'USA') {
            // if the map is zoomed in on a state the circles will have larger radii
            return 2.5 * room;
        } else {
            // and if the map is zoomed out on the whole country they are smaller
            return 1 * room;
        }
    }

    // this is the scale for price (work in progress)
    function scalePrice(money) {

        money = +money;

        // Doing this to make map easier to look at
        // Still get the picture that it's expensive.
        if (money > 1000000) {
            money = 1000000;
        }

        if (STData !== null && STData.state !== 'USA') {
            // if the map is zoomed in on a state the circles will have larger radii
            return (money + 100000) / 70000;
        } else {
            // and if the map is zoomed out on the whole country they are smaller
            return (money + 100000) / 200000;
        }
    }

    // this is the scale for Sqr Ft (work in progress)
    function scaleFt(ft) {

        ft = +ft;

        // Doing this to make map easier to look at
        // Still get the picture that there is a lot of space.
        if (ft > 10000) {
            ft = 10000;
        }

        let ftPlus;

        if (STData !== null && STData.state !== 'USA') {
            // if the map is zoomed in on a state the circles will have larger radii
            // return Math.sqrt(ft) / 50;
            ftPlus = (ft + 1000) / 500;
            return ftPlus;
        } else {
            // and if the map is zoomed out on the whole country they are smaller
            // return Math.sqrt(ft) / 100;
            ftPlus = ft / 2000;
            return ftPlus;
        }
    }


    // this is the level of transparency. Zoomed out it is very transparent
    // zoomed in it is less so
    let transparency = .1;
    if (STData !== null && STData.state !== 'USA') {
        transparency = .4;
    }

    // --------------------------
    // colors for circles
    const bedColor = 'pink';

    const bathColor = 'lightblue';

    const priceColor = 'lightgreen';

    const ftColor = 'orange';
    // --------------------------

    // ==========================================
    /**
     * This Function Builds a Circle Layer.
     * 
     * @param   {string}      lay       The key that represents the the desired data to be plotted, surrounded in "".
     * @param   {string}      color     Changes the fill and Color of the circles.
     * @param   {function}    scale     A function the scales the radii of the circles based on given value.
     * @param   {number}      tran      Affects the Opacity of the circle.
     * @param   {function}    pop       A function that creates the string that goes into the popup.
     * @param   {object}      gData     The data for which the circles are plotted from.
     * @param   {object}      STData    If not null it is just info on the state the map is zoom in on.
     * 
     * @return  {object}      The layer of Circles that can be put into the map building function.
     */
    function magicLayer(lay, color, scale, tran, pop, gData, STData) {


        // this is where individual circles will be pushed
        let dots = [];

        // iterating over length of data and making a circle for each point
        for (let i = 0; i < dataLength; i++) {
            const current = gData[i];
            let dot = L.circleMarker([current.latitude, current.longitude], {
                color: color,
                fillColor: color,
                radius: scale(current[lay]),
                fillOpacity: tran,
                opacity: tran
            });

            // If the map is not currently zoomed on full USA there will be Popups
            if (STData !== null && STData.state !== 'USA') {
                dot.bindPopup(pop(current));
            }

            // pushing circles to array of circles
            dots.push(dot);
        }

        // making layer out of circles
        let dotLayer = L.layerGroup(dots);

        // returning that layer
        return dotLayer;
    }
    // ==========================================

    // ================================================
    // Using magicLayer function to make Layers

    // circles for Beds
    let bedCircleLayer = magicLayer('beds', bedColor, scaleBedBath, transparency, Popcorn, gData, STData);

    // circles for Baths
    let bathCircleLayer = magicLayer('bath', bathColor, scaleBedBath, transparency, Popcorn, gData, STData);

    // circles for Price
    let priceCircleLayer = magicLayer('price', priceColor, scalePrice, transparency, Popcorn, gData, STData);

    // circles for SqrFt
    let ftCircleLayer = magicLayer('sqrft', ftColor, scaleFt, transparency, Popcorn, gData, STData);

    // ================================================

    // Passing layers into map building function, and STData if it is not null
    buildMap(bathCircleLayer, bedCircleLayer, priceCircleLayer, ftCircleLayer, STData);

}

// End where Circles are Drawn and Built
// =========================================================

// ========================================================
// Start Where Map is Initialized

// This Function Initializes the Map
function initMap() {
    benji.json('/graphsdata', gData => {
        // console.log(gData);

        // // just renameing gData for some reason
        // filtData = gData;

        // passing data into functions to build map
        createMarkers(gData);

        console.log(d3.extent(gData.map(d => d.sqrft)));

        // just a message to let me know we are at the end of the process
        console.log('Mapped');
    });
}

// runs the initial map
initMap();

// End where Map is Initialized
// ========================================================

// =======================================================
// Start Where Map is Adjusted

// This gets passed into the change handler 
// and changes the map on changes in state
function reMap(ST) {
    // This is the centers of states the map needs to move
    benji.json('/statesdata', sData => {
        // this i my circle data
        benji.json('/graphsdata', gData => {

            // declaring a variable to hold filtered gData
            let filtgData;

            // declaring a varaible to hold filtered sData
            // initialing it holds data on USA
            let filtsData =
            {
                latitude: 37.0902,
                longitude: -95.7129,
                name: 'United States of America',
                state: 'USA',
                zoomin: 4
            };

            if (ST === 'USA') {
                // if the selected value is USA I don't filter the data
                // and filtsData remains untouched
                filtgData = gData;

            } else {
                // if the selected value is not USA, filter gData by that STate
                // and filtsData becomes only that states data
                filtgData = gData.filter(d => d.state === ST);
                filtsData = sData.find(d => d.state === ST);

                // find the zoom level for that state
                let filtzLevel = zoomLevels.find(d => d.state === ST);

                // and attach a zoom level to filtsData
                filtsData.zoomin = filtzLevel.zoomin;

            }

            // then Pass filtgData and filtsData into createMarkers
            // notice that now STData in createMarkers will no longer be null.
            createMarkers(filtgData, filtsData);
            // console.log(filtgData);

            console.log('ReMapped');
        });
    });
}

// End where Map is Adjusted
// ========================================================

// =============================================
// Start Change Handle

function optionChanged(ST) {
    reMap(ST);
    redrawDonut(ST);
    redrawBar(ST);
}

// End Change Handle
// =========================================
