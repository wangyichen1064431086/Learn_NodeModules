/// Loading Data
/**
 * 让我们把数据集抽取到一个单独的文件中，以适应更实际的场景。一个外部的数据文件，将chart的实现从数据中剥离开来，这样就使得chart针对多个数据集、甚至实时变动的数据的实现具有更好的复用性。
 * 以Tab分隔的TSV是一种方便的扁平式数据格式。这种格式可以从Microsoft Excel或其他电子制表程序导出，或者也可以在文本编辑器中手动创建。
 * TSV数据格式是每一行代表一个table row，每个table row由多个由tabs分隔的columns组成。第一行是header row,其指定了列的名称。
*/

/**
 * d3.tsv可以完成将数据文件从服务器下载并解析为JavaScript对象的工作
 * 下载data引入了一个新的复杂问题：downloads是异步的。d3.tsv执行时，它会马上return,此时文件还在后台下载。
*/
/** d3.tsv执行机制：
   // 1. Code here runs first, before the download starts.

  d3.tsv("data.tsv", function(error, data) {
    // 3. Code here runs last, after the download finishes.
  });

  // 2. Code here runs second, while the file is downloading.
*/

/**
 * Thus we need to separate the chart implementation into two phases. 
 * First, we initialize as much as we can when the page loads and before the data is available. It’s good to set the chart size when the page loads, so that the page does not reflow after the data downloads.(首先我们尽可能地做一些初始工作，在页面加载且data还没有准备好的时候。在页面loads时先把chart的size设置好是比较好的做法，这样页面就不用在data下载好后再reflow了)
 * Second, we complete the remainder of the chart inside the callback function.
*/

var width = 420,
    barHeight = 20

var x = d3.scale.linear()
  .range([0, width]);//we can't define the domain until the data is loaded,thus the domain should be set inside the callback function.

var chart = d3.select(".chart")
  .attr("width",width);//Like wise, although the width of the chart can be set statically,the height of the chart depends on the number of bars and thus must be set in the callback function.

d3.tsv("static/data.tsv",type,function(error,data) {
  /**
   * 关于参数type:d3.tsv isn't smart enough to detect and convert types automatically. Instead, we specify a type function that is passed as the second argument to d3.tsv.
   * NOTE:该方法原理是Ajax，故其不能跨域。所以，得放到服务器上。
   */
  console.log(data);
  x.domain([0, d3.max(data,function(d) {
    return d.value;
  })]);
  chart.attr("height", barHeight * data.length);
  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d,i) {
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("width", function(d) {
        return x(d.value);
      })
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", function(d) {
        return x(d.value) - 3;
      })
      .attr("y", barHeight / 2)//应该是(barHeight-1)/2
      .attr("dy", ".35em")
      .text(function(d) {
        return d.value;
      });
});

function type(d) {
  d.value = +d.value;//强制转换成number
  //TechTip:一元正好是转换其他对象到数值的最推荐做法。
  return d;
}