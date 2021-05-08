console.log("main.js loaded");

// bar graph (Anthony Njuguna)

// ==========================
// Andy Wrote This
let lineSelected = d3.select('#line');
let lineSelectedWidth = lineSelected.property('offsetWidth');
console.log(lineSelectedWidth);
// ==========================

// Setting variable for line grapgh height and width
var lineHeight = 5 * lineWidth / 6;
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

    var filteredData = data.filter(d => d.state === ST);
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

  var xaxis = [y1.length, y2.length, y3.length, y4.length, y5.length, y6.length];

  var trace1 = {
    type: "bar",
    y: xaxis,
    x: ["-1000", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3000+"],
    tickangle: 90
  };

  if (ST !== null) {
    aTitle = `Popular Unit Size for ${data[0].state}`;
  } else {
    aTitle = 'Popular Unit Size for USA';
  }
  var layout = {
    title: aTitle,

    // xaxis_title="X Axis Title",
    // yaxis_title="Y Axis Title",
  };

  var data1 = [trace1];

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

var label = ["1800s", "1810s", "1820s", "1830s", "1840s", "1850s", "1860s", "1870s", "1880s", "1890s", "1900s", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"]

var colors = [
  'rgb(220, 20, 60)',
  'rgb(205,92,92)',
  'rgb(255,260,122)',
  'rgb(255,165,0)',
  'rgb(240,230,140)',
  'rgb(154,205,50)',
  'rgb(107,142,35)',
  'rgb(50,205,50)',
  'rgb(255, 153, 255)',
  'rgb(153, 255, 255)',
  'rgb(153, 255, 153)',
  'rgb(255, 204, 153)',
  'rgb(255, 153, 255)',
  'rgb(153, 255, 255)',
  'rgb(153, 255, 153)',
  'rgb(255, 204, 153)',
  'rgb(255, 153, 255)',
  'rgb(153, 255, 255)',
  'rgb(153, 255, 153)',
  'rgb(255, 204, 153)',
  'rgb(255, 153, 255)',
  'rgb(153, 255, 255)',
]


// --------------------------------------

function sortYears() {
  benji.json("/graphsdata", data => {
    //console.log(data);

    var yearBuilt = data.map(data => data.yearbuilt);
    console.log(yearBuilt);
    
    // Code help from Andy
    yearBuilt.forEach(row => {

      for (let i = 0; i < decadeLength; i++) {

        if (row.includes(decade[i])) {
          count[i] = count[i] + 1;
        }

    }
    
  });
    // console.log(decade);
     console.log(count);
});
}

// --------------------------------------

function drawingDonutChart() {

  // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html 
  // and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)

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
              text: `Decades Units were built`
          }

        }
      }
    }
  };

  // Creates the donut chart (code from https://www.chartjs.org/docs/latest/getting-started/)
  var myChart = new Chart(document.getElementById('myChart'), config);

  donutChart = myChart;


// --------------------------------------

function initDonut(){
  // var donutGraph = d3.select("#donut");

    benji.json("/graphsdata", data => {
      // console.log(data);
     
    sortYears(data);


    drawingDonutChart();

  });
}

initDonut();

// --------------------------------------

function redrawDonut(ST) {
  console.log(`User selected ${ST}`);

  // var donutGraph = d3.select("#donut");

  donutChart.destroy();


    benji.json("/graphsdata", data => {
      //console.log(data);
      
      if (ST === "USA") {
        initDonut();
      }

      else{
      var yearBuiltArray = data.filter(data => data.state === ST); 
      console.log(yearBuiltArray);

      var yearBuilt = yearBuiltArray.map(data => data.yearbuilt);
      console.log(yearBuilt);

      yearBuilt.forEach(row => {
      
        for (let i = 0; i < decadeLength; i++){
  
          if(row.includes(decade[i]) ){
            count[i] = count[i] + 1;
          }
      }
      
    });
    console.log(count);
      drawingDonutChart();
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

