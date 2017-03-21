/// Three Circles
// <https://bost.ocks.org/mike/circles/>



/// Selecting Elements
var circle = d3.selectAll("circle");
circle.style("fill","steelblue");
circle.attr("r",30);
//MARK：几何学属性（如rect的width属性)必须指定为attributes，美学属性（如fill)可以用styles设置。虽然attributes适用于所有属性，我还是推荐你用styles来设置美学属性；这样保证了任何inline styles 在样式层叠表中表现良好。