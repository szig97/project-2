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

// donut chart
var donutChart;

var decade = ["180","181", "182", "183", "184","185","186","187","188","189","190","191", "192", "193", "194", "195","196","197", "198","199", "200","201"]
const decadeLength = decade.length

// Got code https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
var count = new Array(decadeLength).fill(0);

var label = ["1800s","1810s", "1820s", "1830s", "1840s","1850s","1860s","1870s","1880s","1890s","1900s","1910s", "1920s", "1930s", "1940s", "1950s","1960s","1970s", "1980s","1990s", "2000s","2010s"]

function sortYears(data) {
  benji.json("/graphsdata", data => {
    console.log(data);

    var yearBuilt = data.map(data => data.yearbuilt);
    console.log(yearBuilt);

    yearBuilt.forEach(row => {
      
      for (let i = 0; i < decadeLength; i++){

        if(row.includes(decade[i]) ){
          count[i] = count[i] + 1;
        }
    }
    
  });

    console.log(decade);
    console.log(count);
});
}

function drawingDonutChart() {
  
  // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)
  const graphData = {
    labels: label,
    datasets: [{
      label: 'Dataset',
      data: count,
      backgroundColor: [
        'rgb(255, 153, 255)',
        'rgb(153, 255, 255)',
        'rgb(153, 255, 153)',
        'rgb(255, 204, 153)'
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
                text: 'Year Houses are Built'
            }
        }
    }
  };

  // Creates the donut chart (code from https://www.chartjs.org/docs/latest/getting-started/)
  var myChart = new Chart(document.getElementById('myChart'),config);

  donutChart = myChart;
}

function initDonut(){
  var donutGraph = d3.select("#donut");

    benji.json("/graphsdata", data => {
      // console.log(data);
     
    sortYears();

    drawingDonutChart();
    
});
}

initDonut();


function redrawDonut(ST) {
  console.log(`User selected ${ST}`);

  var donutGraph = d3.select("#donut");

  donutChart.destroy();

    benji.json("/graphsdata", data => {
      console.log(data);
  
      var yearBuiltArray = data.filter(data => data.state === ST); 
      console.log(yearBuiltArray);

      var yearBuilt = yearBuiltArray.map(data => +data.yearbuilt);
      console.log(yearBuilt);

      sortYears();
      drawingDonutChart();
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

