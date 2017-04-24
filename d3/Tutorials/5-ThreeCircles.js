/// Three Circles
// <https://bost.ocks.org/mike/circles/>



/// Selecting Elements
var circle = d3.selectAll("circle");
circle.style("fill","steelblue");
circle.attr("r",30);
//MARK：几何学属性（如rect的width属性)必须指定为attributes，美学属性（如fill)可以用styles设置。虽然attributes适用于所有属性，我还是推荐你用styles来设置美学属性；这样保证了任何inline styles 在样式层叠表中表现良好。

/**
 * To set each circle’s x-coordinate to a random value
 *
circle.attr("cx", function() {
  return Math.random() * 720;
});
*/


/// Binding Data
/**
 *  Let’s say we want these circles represent the numbers 32, 57 and 112. The selection.data method binds the numbers to the circles
 * The first number (the first datum, 32) is bound to the first circle (the first element, based on the order in which they are defined in the DOM), the second number is bound to the second circle, and so on.
 */
circle.data([32, 57, 112])
  .attr("r", function(d) {
   /**
   * Set the radius using the data
   */
    return Math.sqrt(d);
  })
  .attr("cx", function(d,i) {
    /*
    * First argument:d,refer to data
    * Second argument(optional): i,the index of the element within its selection.It is often useful for positioning elements sequentially
    */
    return i * 100 + 30;
  });



/// Entering Elements
/**
 * When joining data to elements, D3 puts any leftover data — or equivalently “missing” elements — in the enter selection. With only three circles, a fourth number would be put in the enter selection.(当为elements添加数据的时候，D3将多余的数据——或者说还缺少的elements——放入"enter" selection。因为这里有3个圆圈，所以第四个就被放入"enter " selection)
 * The new circles will be appended to the element defined by parent selection.(新的circles会添加到circle的父元素下)
 */
var svg = d3.select("svg");
var circle = svg.selectAll("circle")
    .data([32, 57, 112, 293])
  .enter().append("circle")//MARK: Entering elements are already bound to the data

    .attr("cy", 60)
    .attr("cx", function(d, i) {
      return i * 100 + 30;
    })
    .attr("r", function(d) {
      return Math.sqrt(d);
    })
    .style("fill", "steelblue");
/**
 * This pattern is so common, you’ll often see the "selectAll + data + enter + append" methods called sequentially
 */



/// Exiting Elements
/**
 *  The "exit"" selection computed by a data join is more powerful.
 * "exit" selection 是"enter" selection的反射，它包含了没有数据对应的多余的elements。
 */
var circle = svg.selectAll("circle")
      .data([32, 57])
      .exit().remove();



/// All Together
/**
 * Consider the 3 possible outcomes that result from joining data to elements:

1. enter - incoming elements, entering the stage.
2. update - persistent elements, staying on stage.
3. exit - outgoing elements, exiting the stage.

*  MARK: If there are more data than elements, the extra data are in the enter selection. And if there are fewer data than elements, the extra elements are in the exit selection.


*/

var circle = svg.selectAll("circle")
    .data([32, 57, 293], function(d) {
      /**
       * MARK:By default, the data join happens by index.BUT You can control precisely which datum is bound to which element by specifying a key function to selection.data.
       */
      return d;
    });
  
circle.enter().append("circle")
    .attr("cy",60)
    .attr("cx", function(d, i) {
      return i * 100 + 30;
    })
    .attr("r", function(d) {
      return Math.sqrt(d);
    })
    .style("fill", "steelblue");
circle.exit().remove();