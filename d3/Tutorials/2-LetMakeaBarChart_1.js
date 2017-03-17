/// 参见<https://bost.ocks.org/mike/bar/>



/// Selecting an Element
/*** CODE:
var body = d3.select("body");
var div = body.append("div");
div.html("Hello,world!");

var p = d3.selectAll("p");
var section = d3.selectAll("section");
var div = section.append("div");
div.html("Hello,world!");
*/



/// Chaining Methods
/*** CODE:
d3.select("body")
    .style("color","blue")
    .style("background-color","yellow");
*/
/**
 * 注意我们甚至不需要使用一个var来选中body Element,其在应用任何操作后可以被丢弃。链式操作可以让你写更少的代码。
 */

/**
 * 然而，虽然多数操作返回的是同一个selection，一些方法返回了一个新的selection。For example,selection.append返回了一个新的selection，其包含了一个新element。这就让你可以针对新元素进行链式操作。
 */
/*** CODE:
  d3.selectAll("section")
      .attr("class","special")
    .append("div")
      .html("Hello,world!");
*/
/**
 * 由于链式方法只能在dom层级中向下寻找，所以要使用var来保存上级的selections。
 */
/*** CODE:
var section = d3.selectAll("section");
section.append("div")
  .html("First!");
section.append("div")
  .html("Second.");
*/


/// Coding a Chart,Automatically
var data = [4,8,15,16,23,42];
/**
 * starting with an empty page that contains only a div of class "chart"
 */
///CODE: d3.select(".chart")//select the chart container using a class selector.
 ///CODE: .selectAll("div")
  /**  initiate the data join by defining the selection to which we will join data.（定义一个我们想添加数据的selection）
   *  NOTE: The data join is a general pattern that can be used to create, update or destroy elements whenever data changes.
   */
    ///CODE: .data(data)
    /** join the data (defined previously) to the selection
    */
 ///CODE:  .enter().append("div")
  /** Since we know the selection is empty, the returned update and exit selections are also empty, and we need only handle the enter selection which represents new data for which there was no existing element. 
   * We instantiate these missing elements by appending to the enter selection.（我们通过向enter election添加element实例化这些原本不存在的elements,）
   */
   ///CODE:  .style("width",function(d) {
 ///CODE:    return d * 10 + "px";
    ///CODE: }) // Set the width of each new bar
     
   ///CODE: .text(function(d) {
     ///CODE:  return d;
   ///CODE:  }); // Set the text content of each bar
/**
 * MARK:D3的选择器操作符如attr,style,property,允许你为所有selected elements指定常量值，也允许你指定函数从而对每一个element分别计算
 */



/// Scaling to Fit
/**
 * 上述代码中有个弱点是magic number 10的使用，其是想扩大数据值为合适的px宽度。这个数字的选取取决于数据的domain(0,42),和你希望图表应有的宽度（420）。这些依赖在value10中含蓄地表达出来了。
 * 我们可以明确地表达出这些依赖，不再使用magic number,而是使用linear scale
 * D3的scales模块可以指定一个从数据domain到呈现range的映射（这里是[0,42]到[0,420])
 */
var x = d3.scale.linear() //NOTE:只有d3.v3可以这么用,d3.v4该函数会报错！！！
  .domain([0,d3.max(data)])
  .range([0,420]);
/**
 * 虽然这里的x看起来像个object，它也是一个函数，其返回了一个用于放大呈现的折算值（这里即10）
 * 像这样使用新的scale：
 */
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width",function(d) {
      return x(d) + "px";
    })
    .text(function(d) {
      return d;
    });
