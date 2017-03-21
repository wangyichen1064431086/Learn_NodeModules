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
     * 建立直线标尺，默认使通过domain[0,1]和range[0,1]来得到。这样以来，默认的顺序标尺就是数值本身：Eg——linear(0.5) returns 0.5
    */
    .range([height,0]);
    /** linear(x).xx()
     * Given a value x in the input domain, returns the corresponding value in the output range.
     ** linear.range([values])
     * 如果指定了values,则将输出的范围设置为指定的array of values
     * @param:values, Type Array,其必须包含2个或多个值，以对应input domain。
     ** linear.domain([numbers])
     *  如果指定了numbers，则设置input domain 为指定的numbers array
     * 
    */



/// Adding Axes
/**
 * 我们这样来定义一个坐标轴：将它绑定到现有的x-scale上，并声明4种方位。由于我们的x-axis要出现在bars的下方，这里我们使用"bottom"方位
 */
var xAxis = d3.svg.axis()
    /** Axis:
     * The axis component is designed to work with D3’s quantitative, time and ordinal scales
     * d3.svg.axis()
     * Create a new default axis.
     */
    .scale(x)
    /** axis.scale([scale])
     * If scale is specified, sets the scale and returns the axis. If scale is not specified, returns the current scale which defaults to a linear scale.（如果指明了scale，则为axis设置scale）
    */
    .orient("bottom");
    /** axis.scale([orientation])
     * If orientation is specified, sets the orientation and returns the axis. 
    */

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
  .append("g")//整个内容区域，向右、向下移动了margin.left和margin.top
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
/**
 * 再向上述chart(即上述链式操作的最后一个g)append的元素都继承了这种transform
 */




d3.tsv("static/data.tsv", type, function(error, data) {
  console.log(data);
  ///读取数据后，再来设置x标尺的domain
  x.domain(data.map(function(d) {//x轴的标尺是ordinal()，顺序标尺
    /**
     * linear.domain([numbers])
     *  如果指定了numbers，则设置input domain 为指定的numbers array
     */
    return d.name;
  }));
  y.domain([0, d3.max(data, function(d) {//y轴的标尺是linear，数值标尺
    return d.value;
  })]);

  chart.append("g")//作为x轴组件
      .attr("class", "x axis")//添加x轴额外样式
      .attr("transform", "translate(0," + height + ")")//通过transform属性定义x轴位置
      .call(xAxis);//调用xAxis函数生成x轴

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);//调用yAxis函数生成y轴

  chart.selectAll(".bar")//声明chart下的一种子元素，其具有class ".bar"
      .data(data)//通该data绑定到该.bar上
    .enter().append("rect")//将该.bar元素具体化为rect元素
    /** 这里注意与前述例子的不同，前述例子的写法为：
     * var bar = chart.selectAll("g")
     *         .data(data)
     *       .enter().append("g");
     * 即，前述是把每个rect和text都作为g的子元素，而现在是把rect直接加到坐标轴g元素的后面，为坐标轴g元素的兄弟元素。
     */
      .attr("class","bar")//注意，即使该rect元素在绑定数据时声明为".bar"，还是要再添加一遍bar的样式
      .attr("x",function(d) {
        return x(d.name);//通过x标尺，找到对应数据点的x坐标位置
      })
      .attr("y",function(d) {
        return y(d.value);//通过y标尺，找到对应数据点的y坐标位置
      })
      .attr("height", function(d) {
        return height - y(d.value);//高度为图形区域图总高度-y轴位置值
        //MARK：因为这里原点在左上角，故bar的高度要反过来计算
      })
      .attr("width", x.rangeBand());
      /** ordinal.rangeBand():
       * Returns the band width.
      */
});

function type(d) {
  d.value = +d.value;
  return d;
}