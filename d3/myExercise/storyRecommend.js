var margin = {
  top:20,
  right: 30,
  bottom: 30,
  left:40
},
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundPoints([0, width],1.0);

var y = d3.scale.linear()
    .range([height,0]);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
  .append("g")  
    .attr("transform", "translate("+margin.left+","+margin.top+")");


d3.tsv("static/storyRecommendData.tsv", type, function(error,data) {
  console.log(data);
  x.domain(data.map(function(d) {
    return d.date;
  }));
  y.domain([0,d3.max(data,function(d) {
    return d.clickFromRecommends;
  })]);

  chart.append("g")
    .attr("class","x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);
  
  chart.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("cy",function(d) {
        return y(d.clickFromRecommends);
      })
      .attr("cx",function(d,i) {
        return x(d.date);
      })
      .attr("r",5)
      .style("fill","steelblue");

  var line = d3.svg.line()//4.0中直接是d3.line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.clickFromRecommends);
      });

  chart.append('g').append('path')
    .datum(data)
    /**
     * 
     */
    .attr('d', function(d) {
      return line(d);
    })
    .attr('fill','none')
    .attr('stroke','steelblue');
});


function type(d) {
  d.clickFromRecommends = +d.clickFromRecommends;
  return d;
}
