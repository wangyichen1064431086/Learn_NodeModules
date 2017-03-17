// D3 Data-Driven Documents
/** 资源：
 * 网站<https://github.com/d3/d3/blob/master/API.md>
 * 指南：<https://github.com/d3/d3/wiki/Tutorials>
 * API Docs:<https://github.com/d3/d3/blob/master/API.md>
 */

/**
 * D3.js是一个基于数据的操作DOM的JavaScript库。D3 helps you bring data to life using HTML,SVG and CSS。
 * D3强调web标准，给以你控制现代浏览器的能力，而非将你限制于某一个专有框架；将强大的可视化组件和数据驱动方法与DOM操作结合起来
 */



/// Introduction
/** 
 * D3允许你将任意数据绑定到DOM上，然后将数据驱动的转换应用到document上。For example,你可以通过D3用数据数组来生成一个HTML table。或者，使用相同的数据来创造一个交互的SVG bar chart。
 * D3不是一个力图提供每个可能的功能的整体框架。相反，D3解决的是问题的关键点：基于数据有效率的操作document。这样就避免了专有的表示，而是提供了非凡的灵活性，将web标准（HTML,SVG,CSS）的所有功能都暴露出来。
 * 在最小的开销下，D3的速度非常快，支持大数据集和针对交互、动画的动态行为。
 * 通过对组件和插件的不同组合，D3允许代码重用。
 */



/// Selections
/**
 * 修改了W3C DOM API的冗长： 方法名称很啰嗦，必要的方法需要人工迭代和统计暂时状态
 */
/**
 * D3采用了a declarative approach（一个声明式的方法），可以操作任意的节点集——即selections：
 */
d3.selectAll("p").style("color","red");
/**
 * 也可以操作单个节点：
 */
d3.select("body").style("background-color","pink");
/**
 * 选择器是通过W3C Selector API定义的，被现代浏览器原生支持。
 */
/**
 * D3提供了大量的操作nodes的方法：
 * Setting attributes or styles
 * Register event listeners
 * Adding,removing or sorting nodes
 * Changing HTML or text content 
 ** 以上满足了大部分的主要需求。
 * 直接访问底层DOM也是可能的，因为每个D3选择器都是简单的nodes数组
 */



/// Dynamic Properties
/**
 * 和其他DOM框架如jQuery、Prototype类似，在d3中，styles、attributes和其他properties可以被指定为函数，而非简单的常量。这些函数虽然表面上看起来很简单，其实非常强大；For example,d3.geo.path函数，将地理坐标系投射到SVG路径数据。
 * D3提供了许多内建的可复用的functions和function factories，如针对area,line和pie charts的graphical primitives（图基）
 */
/**
 * Example1，随机给段落上色：
 */
d3.selectAll("p").style("color",function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
  /** TechTip: hsl(hue, saturation, lightness)
   * Hue:色度. It is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
   * saturation:饱和度。It is a percentage value; 0% means a shade of gray and 100% is the full color.
   * lightness:亮度。It is also a percentage; 0% is black,100% is white.
   */
});
/**
 * Example2:奇偶间隔上色
 */
d3.selectAll("p").style("color",function(d,i) {
  return i % 2 ? "red" : "green";
});
/**
 * Example3:依赖数据的计算属性
 */
d3.selectAll("p")
  .data([4,8,15,16,23,42])
  .style("font-size",function(d) {
    return d + "px";
  });



  /// Enter and Exit
  /**
   * 使用D3的enter和exit选择器，你可以为新数据创建新nodes,或移除不再需要的nodes。
   * 当数据绑定到selection上时，data数组中的每个项目和一个selection的node配对。
   * 如果node比data少，额外的data就组成了enter selection,你可以通过将它添加到enter selection来将其实例化。
   */
  /**
   * Example1:
   */
  d3.select("body")
    .selectAll("p")
    .data([4,8,15,16,23,42])
    .enter().append("p")
      .text(function(d) {
        return "I'm number" + d + "!";
      });
  /**
   * Example2:Update
   */
   var p = d3.select("body")
    .selectAll("p")
    .data([4,8,15,16])//更新已有node的数据内容
      .text(function(d) {
        return d;
      });
    /**
     * Example3:Enter
     */
    p.enter().append("p")//增加相对node多出的数据组成的node
      .text(function(d){
        return d*2;
      });
   /**
    * Example4:Exit
    */  
    p.exit().remove();//移除相对数据多余的node
   /**
    * 如此，D3使得你可以基于数据来改变文档，包括创建和销毁元素。
    * D3允许你改变现有document，以响应用户交互、随时间变化的动画，甚至是来自第三方的异步通知。
    * 混合的方法也是可能的：document最初是从服务器端渲染，然后通过D3在客户端更新
    */
   
  

  /// Transformation, not Representation
  /**
   * D3不是引入新的的可视化表示方式。和Processing,Raphael或Protovis不同，D3的vocabulary of graphical marks（图形标志词汇）直接来自于web标准:HTML,SVG和CSS。
   * 例如，你可以使用D3创建SVG元素,并用额外的样式表给它们添加样式。你可以使用复合过滤效果，虚线，和修剪。如果浏览器供应商引入了新特性，你可以马上就直接使用它们——不需要升级工具包。
   * 最好的一点是，用浏览器内建的“审查元素”调试D3很方便:你用D3操纵的nodes就是浏览器原生理解的nodes
   */



/// Transitions
/**
 * D3关注transformation(转换)，也自然延伸到animated transitions(动画过渡）。过渡是随着时间逐渐地插入样式和属性。
 * Tweening(补间动画)可以通过简单的函数来控制，如"elastic","cubic-in-out"和"linear"。
 * D3的interpolator(插值器)支持原始值,如numbers，内嵌numbers的strings(font size,path data等)；也支持compound values(复合值)。
 * 你甚至可以扩展D3的插值器以支持复杂的属性和数据结构。
 */
/**
 * Example1:背景色渐变为黑色
 */
d3.select("body").transition()
  .style("background-color","yellow");
/**
 * Example2:以a staggered delay(交错延迟)的方式改变符号地图中的圆圈大小
 */