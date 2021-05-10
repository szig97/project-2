console.log("main.js loaded");

// bar graph (Anthony Njuguna)

// ==========================
// Andy Wrote This
let lineSelected = d3.select('#line');
let lineSelectedWidth = lineSelected.property('offsetWidth');
console.log(lineSelectedWidth);
// ==========================

// Setting variable for line grapgh height and width
var lineHeight = 55 * lineWidth / 6;  
var lineWidth = lineSelectedWidth;

// Append line graph
var linegraph = d3.select("#line")
  .append("linegraph")
  .attr("height", lineHeight)
  .attr("width", lineWidth);

function initBar() {
  benji.json("/graphsdata", data => {
    // console.log(data);

    DrawBar(data);

  });
}
function redrawBar(ST) {
  console.log(`User selected ${ST}`);


  benji.json("/graphsdata", data => {
    console.log(data);

    var filteredData;
    if (ST === 'USA') {
      filteredData = data;
    } else {
      var filteredData = data.filter(d => d.state === ST);
    }

    DrawBar(filteredData, ST);
  });
}


function DrawBar(data, ST = null) {

  // Use the map method with the arrow function to return all the filtered sqrft.
  var sqrft = data.map(data => +(data.sqrft));

  // Use the map method with the arrow function to return all the filtered prices.
  var price = data.map(data => +(data.price));

  // data.sort(function (a, b) { return a.sqrft - b.sqrft });
  
  var y1 = data.filter(data => (data.sqrft <= 1000));
  var y2 = data.filter(data => (data.sqrft > 1000 && data.sqrft <= 1500));
  var y3 = data.filter(data => (data.sqrft > 1500 && data.sqrft <= 2000));
  var y4 = data.filter(data => (data.sqrft > 2000 && data.sqrft <= 2500));
  var y5 = data.filter(data => (data.sqrft > 2500 && data.sqrft <= 3000));
  var y6 = data.filter(data => (data.sqrft > 3000));

  var y = [y1.length, y2.length, y3.length, y4.length, y5.length, y6.length];

  var trace1 = {
    type: "bar",
    y: y,
    x: ["-1001", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3001+"],
    
  };

  if (ST !== null && ST !== 'USA') {
    aTitle = `Most Popular Unit Size for ${data[0].state}`;
  } else {
    aTitle = 'Most Popular Unit Size for USA';
  }
  
  var data1 = [trace1];

  var layout = {
    title: aTitle,
    xaxis: { title: "Square Feet" },
    yaxis: { title: "Number of Properties"},
    
  };

  Plotly.newPlot('line', data1, layout);
};

initBar();

// ========================================================

// donut chart (Jeannaej Yambing)
var donutChart;

var decade = ["180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201"]
const decadeLength = decade.length

// Got code https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
var count = new Array(decadeLength).fill(0);

var label = ["1800s", "1810s", "1820s", "1830s", "1840s", "1850s", "1860s", "1870s", "1880s", "1890s", "1900s", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];

var colors = [
  'rgb(232, 73, 71)',
  'rgb(223, 71, 87)',
  'rgb(255, 85, 94)',
  'rgb(214, 107, 103)',

  'rgb(239, 164, 58)',
  'rgb(232, 140, 84)',
  'rgb(255, 134, 80)',
  'rgb(222, 150, 93)',

  'rgb(244, 224, 43)',
  'rgb(248, 232, 70)',
  'rgb(255, 233, 129)',
  'rgb(236, 231, 136)',

  'rgb(139, 201, 11)',
  'rgb(100, 216, 127)',
  'rgb(139, 241, 139)',
  'rgb(181, 219, 127)',

  'rgb(57, 167, 222)',
  'rgb(83, 146, 210)',
  'rgb(131, 178, 255)',
  'rgb(142, 205, 210)',

  'rgb(95, 68, 147)',
  'rgb(97, 68, 208)',
  
];

// ==========================
// Andy Wrote This Function
// This function clears the count array to count the number of units in each decades

function Zero(count) {
  const len = count.length;
  for (let i = 0; i < len; i++) {
      count[i] = 0;
  }
  return count;
}

// ==========================
// This function sorts the Year the units were built and gets the count for each decade

function sortYears() {
  benji.json("/graphsdata", data => {
    //console.log(data);

    var yearBuilt = data.map(data => data.yearbuilt);
    // console.log(yearBuilt);
    
    // Code help from Andy
    yearBuilt.forEach(row => {

      for (let i = 0; i < decadeLength; i++) {

        if (row.includes(decade[i])) {
          count[i] = count[i] + 1;
        }
    }
  });
    // console.log(decade);
    //console.log(count);
});
}

// --------------------------------------
// This function takes the count array and puts it into the template for creating a Donut Chart with Chart.js

function drawingDonutChart() {

  // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html 
  // and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)

  const graphData = {
    labels: label,
    datasets: [{
      label: 'Dataset',
      data: count,
      backgroundColor: colors,
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
              text: `Decades Units were built`
          }
       }
    }
  };

  // Creates the donut chart (code from https://www.chartjs.org/docs/latest/getting-started/)
  var myChart = new Chart(document.getElementById('myChart'), config);

  donutChart = myChart;
}

// --------------------------------------
// This function creates the initial donut chart with all the USA data

function initDonut(){

    benji.json("/graphsdata", data => {
      // console.log(data);
     
    sortYears(data);
    drawingDonutChart();

  });
}

initDonut();

// --------------------------------------
// This function deletes existing chart and redraws a new chart with given State

function redrawDonut(ST) {

  // Destroys the Canvas that holds the donut chart

  donutChart.destroy();

    benji.json("/graphsdata", data => {
      //console.log(data);
      
      if (ST === "USA") {
        Zero(count);

        initDonut();

        console.log(`Donut Chart Redrawn for USA`);
      }

      else{
      
      Zero(count);

      var yearBuiltArray = data.filter(data => data.state === ST); 
      // console.log(yearBuiltArray);

      var yearBuilt = yearBuiltArray.map(data => data.yearbuilt);
      // console.log(yearBuilt);

      yearBuilt.forEach(row => {
      
        for (let i = 0; i < decadeLength; i++){
  
          if(row.includes(decade[i]) ){
            count[i] = count[i] + 1;
          }
      }

      });

      // console.log(count);
      drawingDonutChart();
      console.log(`Donut Chart Redrawn for ${ST}`);
      }
      
    });
}

// ========================================================

// dropdown for states map and graphs (Sam Ziegler)

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

