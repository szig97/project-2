console.log("main.js loaded");

// line graph

// Setting variable for line grapgh height and width
var lineHeight = 500;
var lineWidth = 600;

// Append line graph
var linegraph = d3.select("#line")
  .append("linegraph")
  .attr("height", lineHeight)
  .attr("width", lineWidth);

d3.json("/graphsdata").then(data => {

  // d3.json("/graphsdata").then(function (data) {

  // view data on console
  // console.log(data);

  // Use the map method with the arrow function to return all the filtered sqrft.
  var sqrft = data.map(data => +(data.sqrft));

  // Use the map method with the arrow function to return all the filtered prices.
  var price = data.map(data => +(data.price));

  // sort by sqrft

  data.sort(function (a, b) { return a.sqrft - b.sqrft });
  // console.log(data);

  var y1 = data.filter(data => (data.sqrft <= 1000));
  var y2 = data.filter(data => (data.sqrft > 1000 && data.sqrft <= 1500));
  var y3 = data.filter(data => (data.sqrft > 1500 && data.sqrft <= 2000));
  var y4 = data.filter(data => (data.sqrft > 2000 && data.sqrft <= 2500));
  var y5 = data.filter(data => (data.sqrft > 2500 && data.sqrft <= 3000));
  var y6 = data.filter(data => (data.sqrft > 3000));
  
  var y = [y1.length, y2.length, y3.length, y4.length, y5.length, y6.length];
  var x = [1000, 1500, 2000, 2500, 3000, 10000];

  console.log("looking at y");
  console.log(y);

  var trace1 = {
    // nbinsx: x.length, 
    // xbins: { size: 1000 }, 
    // x: x,
    y: y, 
    type: "bar"
  };

  var data1 = [trace1];  

  Plotly.newPlot('line', data1);
});





//     // Create the trace
//     var trace = {
//         x: sqrft,
//         y: price,
//         type: "line"
//     };

//     // create array of trace
//     var data = [trace];

//     // Define a layout
//     var layout = {
//         title: "Line Chart",
//         xaxis: {
//             title: "SqrFt",
//             range: [0, 100],
//             ticklen: 20
//         },
//         yaxis: {
//             title: "Price",
//             range: [0, 100],
//             ticklen: 10
//         }
//     };

//     // Create plot
//     Plotly.newPlot("line", data, layout);
// });






 // var count1 = 0;

  // var xaxis = [];

  // for (var i = 0; i < data.length; i++) {
  //   if (data.sqrft <= 1000) {
  //     count1 += 1;
  //   };

  //   if (data.sqrft > 1000 && data.sqrft <= 1500) {
  //     xaxis[1] += 1;
  //   };

  //   if (data.sqrft > 1500 && data.sqrft <= 2000) {
  //     xaxis[2] += 1;
  //   };

  //   if (data.sqrft > 2000 && data.sqrft <= 2500) {
  //     xaxis[3] += 1;
  //   };

  //   if (data.sqrft > 2500 && data.sqrft <= 3000) {
  //     xaxis[4] += 1;
  //   };

  //   if (data.sqrft > 3000) {
  //     xaxis[5] += 1;
  //   };

  //   // console.log(count1);

  // }

  // var xaxis = data.filter(data => data.sqrft <= 1000);





// donut chart







// leaflet map








// dropdown for states map and graphs

