///Let's Make a Bar Chart,3
//资源地址：https://bost.ocks.org/mike/bar/3/



///Rotating into Columns
/**
 * 交换x和y也会带来一些附加的改变。这就是直接和SVG打交道的代价，而不像ggplot2那样在高层面上进行可视化。另一方面，SVG提供了更好的可定制性；且SVG遵循web标准。
 */
/**
 * 附加变化如下：
 * 1. 当将x scale转换为y scale，range（值域）就变成了[height,0],而不再是[0,width]。这是因为SVG的坐标原点在左上角。我们想要横轴在图表的下方，而非上方。 类似地，我们在定位rect的时候，需要设置"y"和"height"属性；但是我们之前是只需要设置"width"。这是因为"x"属性默认值为0，而之前的图正好是左对齐的。
 * 2. 之前，整个图的高度是由数据集的数量决定的；而现在，整个图的宽度是固定的，而单个bar的宽度是可变的。我们计算bar的宽度是通过用总图表宽度除以数据集的数量。
 * 3. 标签文本放置的位置也不同了，现在应放在每个bar的顶部下面。
 */

var width = 960,
    height = 500;

var y = d3.scale.linear()
    .range([height,0]);

var chart = d3.select(".chart")
    .attr("width",width)
    .attr("height",height);

d3.tsv("static/data.tsv", type, function(error,data) {
  console.log(data);
  y.domain([0, d3.max(data, function(d) {
    return d.value;
  })]);

  var barWidth = width/data.length;
  console.log(barWidth);
  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d,i) {
        return "translate(" + i * barWidth + ",0)";
      });
    
    bar.append("rect")
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("height", function(d) {
          return height - y(d.value);
        })
        .attr("width", barWidth - 1);
    
    bar.append("text")
        .attr("x", barWidth/2)
        .attr("y", function(d) {
          return y(d.value) + 3;
        })
        .attr("dy",".75em")
        .text(function(d) {
          return d.value;
        });
});

function type(d) {
  d.value = +d.value;
  return d;
}

