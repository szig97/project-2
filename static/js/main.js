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

function initDonut(){
  var donutGraph = d3.select("#donut");

    benji.json("/graphsdata", data => {
      console.log(data);

  var yearBuilt = data.map(data => +data.yearbuilt);
      console.log(yearBuilt);

      // Got code from https://stackoverflow.com/questions/52711740/group-array-and-get-count
      const input = yearBuilt;
      const result = input.reduce((total, value) => {
           total[value] = (total[value] || 0) + 1;
           return total;}, {});
      //console.log(result);

      var keys = Object.keys(result);
      //console.log(keys);

      var values = Object.values(result);
      //console.log(values);
     

      // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)
      const graphData = {
        labels: keys,
        datasets: [{
          label: 'Dataset',
          data: values,
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
});
}

initDonut();


function CreateDonutChart(ST) {
  console.log(`User selected ${ST}`);

  var donutGraph = d3.select("#donut");

  donutChart.destroy();

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
      //console.log(result);

      var keys = Object.keys(result);
      //console.log(keys);

      var values = Object.values(result);
      //console.log(values);
     

      // Set ups the data for donut chart (outline based of https://www.chartjs.org/docs/latest/charts/doughnut.html and https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html)
      const graphData = {
        labels: keys,
        datasets: [{
          label: 'Dataset',
          data: values,
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

