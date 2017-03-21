/// Preparing Margins
/**
 * 顺序量表经常是和D3的axis组件一起使用，以快速展现标签标记。但是在我们添加axis之前，我们需要清理margins中的一些space。
 * 按照惯例，D3中的margins是通过一个object来指定的，其包含top,right,bottom,left这些属性。然后，图表区域的outer size包含了margins，其用于计算inner size——用于盛放图形区域，其是通过outer size减去margins计算得到的。
 * 例如，一个960*500的chart的合理尺寸如下：
 */
var margin = {
  top: 20, 
  right: 30, 
  bottom: 30, 
  left: 40
},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    /** d3.scale.ordinal():
     * 建立顺序标尺，此时其domain和range都为空，只有指定输出range后ordinal scale才是有效的。
    */
    .rangeRoundBands([0,width],.2);
    /** d3.scale.ordinal.rangeBands(interval[, padding[, outerPadding]]):
     * 从指定的连续区间设置输出范围
     * @param: interval, Type Array,包含两个元素分别为最大值和最小值。这个范围被划分为n个均匀分布的带条，n是input 的数值个数。
     * @param: outerPadding/padding,这些带条可能与interval的边缘有偏移,带条之间也有间隔，默认为0，区间为[0,1]。0.5表示带宽和间隔宽相同。
     **d3.scale.ordinal.rangeRoundBands(interval[, padding[, outerPadding]])
     * 同rangeBands，除了保证了范围值和带宽是整数。
    */

var y = d3.scale.linear()
    /** d3.scale.linear():
     * 建立顺序标尺，通过默认domain[0,1]和range[0,1]。默认的顺序标尺
    */
    .range([height,0]);



/// Adding Axes
/**
 * 我们这样来定义一个坐标轴：将它绑定到现有的x-scale上，并声明4种方位。由于我们的x-axis要出现在bars的下方，这里我们使用"bottom"方位
 */
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
/**
 * 上述结果得到的xAxis对象可用来多次渲染axes，通过使用selection.call来重复声明。将它想象成一个橡皮图章，其可在任何需要的地方打印出axes。axis元素是相对原点定位的，所以要为其container——g元素来设置transform属性。
 */
/*
chart.append("g")
  .attr("class", "x axis")
  .attr("transform","translate(0," + height + ")")
  .call(xAxis);
*/
/**
 * axis组件由以下部分组成：
 * 1.展示定义域的path元素
 * 2.多个带".tick"样式的g元素，用于标记轴上的每个tick。一个tick是由一个text label和一个line组成
 */

var chart = d3.select(".chart")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
//任何随后要添加到chart中的elements都将会继承上述设置的margins。




d3.tsv("static/data.tsv", type, function(error, data) {
  console.log(data);
  x.domain(data.map(function(d) {
    return d.name;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.value;
  })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class","bar")
      .attr("x",function(d) {
        return x(d.name);
      })
      .attr("y",function(d) {
        return y(d.value);
      })
      .attr("height", function(d) {
        return height - y(d.value);
      })
      .attr("width", x.rangeBand());
});

function type(d) {
  d.value = +d.value;
  return d;
}