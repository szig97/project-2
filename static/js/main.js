console.log("main.js loaded");

// line graph


//Setting variable for line grapgh height and width
// Setting variable for line grapgh height and width

// var lineHeight = 600;
// var lineWidth = 400;

// // Append line graph
// var linegraph = d3.select("#line")
//     .append("linegraph")
//     .attr("height", lineHeight)
//     .attr("width", lineWidth);

//  d3.json("/graphsdata").then(function (data) {


//     //view data on console
//     console.log(data);

//     // Use the map method with the arrow function to return all the filtered sqrft.
//     var sqrft = data.map(sqrft => data.sqrft);

//     console.log(sqrft);

//     // Use the map method with the arrow function to return all the filtered prices.
//     var price = data.map(price => data.price);

//     console.log(price);

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
//         xaxis: { title: "sqrft" },
//         yaxis: { title: "price" }
//     };

//     // Create plot
//     Plotly.newPlot("plot", data, layout);
// });


// donut chart
function CreateDonutChart(ST) {
  console.log(`User selected ${ST}`);

  var donutGraph = d3.select("#donut");

    benji.json("/graphsdata", data => {
      console.log(data);
  
      var yearBuiltArray = data.filter(data => data.state === ST); 
      console.log(yearBuiltArray);

      var yearBuilt = yearBuiltArray.map(data => +data.yearbuilt);
      console.log(yearBuilt);

      // Got code from https://stackoverflow.com/questions/52711740/group-array-and-get-count
      const input = yearBuilt;
      const result = input.reduce((total, value) => {
           total[value] = (total[value] || 0) + 1;
           return total;}, {});
      console.log(result);

      var keys = Object.keys(result);
      console.log(keys);

      var values = Object.values(result);
      console.log(values);
     

      // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)
      const graphData = {
        labels: keys,
        datasets: [{
          label: 'My First Dataset',
          data: values,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'doughnut',
        data: graphData,
        options: {
            responsive: true,
            plugins: {
                legend:{
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Doughnut Chart'
                }
            }
        }
      };

      // Creates the donut chart (code from https://www.chartjs.org/docs/latest/getting-started/)
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    
    });
}



// dropdown for states map and graphs

function InitDashboard() {
    console.log("InitDashboard()");

    // Populate Dropdown Menu
    var selector = d3.select("#selState");

    benji.json("/graphsdata", data => {
        console.log(data);

        var sampleState = [...new Set(data.map(data => data.state))];
        sampleState.sort();
        console.log(sampleState);

        // ================================
        // Andy Wrote this
        selector.append('option')
            .text('USA')
            .property('value', 'USA');
        // ================================

        sampleState.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var id = sampleState[0];
    }); 
}

InitDashboard();

