


function barChart(){

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 100, left: 150},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/cf16-uiuc/cs416_finalproject/main/data/UTParkVisits.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 120000000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.ParkName; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.ParkName); })
    .attr("width", function(d) { return x(d.Visitors); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")


    // .attr("x", function(d) { return x(d.ParkName); })
    // .attr("y", function(d) { return y(d.Visitors); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

})

}

