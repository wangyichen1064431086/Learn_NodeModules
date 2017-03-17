///<https://bost.ocks.org/mike/bar/2/>
/**
 * 这章将学习使用SVG,且通过下载的TSV格式的数据
 */



/// Introducing SVG 
/**
 * 和HTML很大程度地被限制为矩形不同，SVG支持强大的绘图基础，如Bezier curvies,gradients,clipping,masks。在制作一个简单的条形图时，我们不需要设置SVG的所有特性，但是学习SVG是值得的。
 * 和其他任何事物一样，这种richness必然是有代价的。SVG文档大到可怕，但是并不需要掌握其所有特征。
 ** SVG和HTML有很多共通之处。你可以写SVG标记然后嵌入到web页面中。SVG elements可以通过CSS样式化，虽然会使用不同的属性名称，例如使用fill代替background-color。
 * 和HTML不同的是，SVG elements必须相对container的左上角定位；SVG不支持flow layout或者文字环绕。
 */



/// Coding a Chart, Manually
/**
 * (代码参见html页)
 * SVG不支持flow layout,故每个g都要加上属性 transform="translate(x,y)"
 * SVG的一个常见的困扰点是：必须以attributes方式指定的属性和可以用styles设置的属性之间的区别。一个速记规则是：几何学属性（如rect的width属性)必须指定为attributes，美学属性（如fill)可以用styles设置。虽然attributes适用于所有属性，我还是推荐你用styles来设置美学属性；这样保证了任何inline styles 在样式层叠表中表现良好。
 * SVG要求文字明确地放置在text elements中。由于text元素不支持padding或margins，文字的位置需要由3个偏移量决定。
 ** TechTip:svg元素(如text)几种定位属性：
 * x:该属性在用户坐标系统中标识了一个x轴坐标。大多数时候，它体现了引用元素的矩形区域的左上角的x轴坐标
 * y:该属性在用户坐标系统中标识了一个y轴坐标。大多数时候，它体现了引用元素的矩形区域的左上角的y轴坐标
 * dx:表示一个元素或其内容在x轴方向上的偏移
 * dy:表示一个元素或其内容在y轴方向上的偏移
 */
/** 静态html的代码如下：
 *   <svg class="chart" width="420" height="120">
      <g transform="translate(0,0)">
        <rect width="40" height="19"></rect>
        <text x="37" y="9.5" dy=".35em">4</text>
      </g>
      <g transform="translate(0,20)">
        <rect width="80" height="19"></rect>
        <text x="77" y="9.5" dy=".35em">8</text>
      </g>
      <g transform="translate(0,40)">
        <rect width="150" height="19"></rect>
        <text x="147" y="9.5" dy=".35em">15</text>
      </g>
      <g transform="translate(0,60)">
        <rect width="160" height="19"></rect>
        <text x="157" y="9.5" dy=".35em">16</text>
      </g>
      <g transform="translate(0,80)">
        <rect width="230" height="19"></rect>
        <text x="227" y="9.5" dy=".35em">23</text>
      </g>
      <g transform="translate(0,100)">
        <rect width="420" height="19"></rect>
        <text x="417" y="9.5" dy=".35em">42</text>
      </g>
    </svg>
 */



/// Coding a Chart, Automatically
var data = [4,8,15,16,23,42];

var width = 420, //总宽度
    barHeight = 20;//每个bar的高度

var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, width]);//图像到数据的尺寸放大倍数函数

var chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", barHeight * data.length);
  //设置最上级元素svg的总宽度、总高度

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform",function(d,i) {
      return "translate(0," + i * barHeight + ")";
    });
    //向svg元素中添加g元素，作为每个数据项的图形区域，并设置每个g元素的位置(g元素的个数、transform的位置值都是根据data计算的)
    //此时bar存储的是g元素组成的数组

bar.append("rect")
  .attr("width", function(d) {
    return x(d);
  })//QUEST：为什么这句话可以直接写作 .attr("width",x)
  .attr("height", barHeight - 1);
  //为每个g元素添加子元素rect，并设置每个rect的宽度为x，高度为(barHeight - 1)


bar.append("text")
  .attr("x", function(d) {
    return x(d) - 3;
  })
  .attr("y",barHeight/2)
  .attr("dy",".35em")
  .text(function(d) {
    return d;
  });
  //为每个g元素添加子元素text,并设置每个text的位置属性 x、y、dy及文本内容

/**
 * Since there is exactly one rect and one text element per g element, we can append these elements directly to the g, without needing additional data joins. Data joins are only needed when creating a variable number of children based on data; here we are appending just one child per parent. The appended rects and texts inherit data from their parent g element, and thus we can use data to compute the bar width and label position.
 * (由于这里每个p元素下恰好只有一个rect和一个text，我们可以直接在g下添加这俩元素，不需要额外地进行data joins。只有在创建基于data的可变数量的子元素时，我们才需要再进行data joins。这里，添加的rects和texts继承了其父元素g所绑定的data，这样我们就可以使用data来计算bar的宽度和label的位置了)
 */



