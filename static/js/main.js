console.log("main.js loaded");

// line graph

// Setting variable for line grapgh height and width
var lineHeight = 600;
var lineWidth = 400;

// Append line graph
var linegraph = d3.select("#line")
    .append("linegraph")
    .attr("height", lineHeight)
    .attr("width", lineWidth);

 d3.json("/graphsdata").then(function (data) {

    // view data on console
    //console.log(data);

    // // Use the map method with the arrow function to return all the filtered sqrft.
    // var sqrft = data.map(sqrft => data.sqrft);

    // console.log(sqrft);

    // // Use the map method with the arrow function to return all the filtered prices.
    // var price = data.map(price => data.price);

    // console.log(price);

    // // Create the trace
    // var trace = {
    //     x: sqrft,
    //     y: price,
    //     type: "line"
    // };

    // // create array of trace
    // var data = [trace];

    // // Define a layout
    // var layout = {
    //     title: "Line Chart",
    //     xaxis: { title: "sqrft" },
    //     yaxis: { title: "price" }
    // };

    // // Create plot
    // Plotly.newPlot("plot", data, layout);
// });


// donut chart
var donutGraph = d3.select("#donut")

    d3.json("/graphsdata").then(function (data) {
        console.log(data);
    
        var yearBuilt = data.map(data => +data.yearbuilt);
       
        console.log(yearBuilt);

    });

function CreateDonutChart(state) {
    console.log(`User selected ${state}`);
}

// leaflet map








// dropdown for states map and graphs

function InitDashboard() {
    console.log("InitDashboard()");

    // Populate Dropdown Menu
    var selector = d3.select("#selState");

    d3.json("/graphsdata").then(data => {
        console.log(data);

        var sampleState = [...new Set(data.map(data => data.state))];
        sampleState.sort();
        console.log(sampleState);

        sampleState.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var id = sampleState[0];
    }); 
}

InitDashboard();

