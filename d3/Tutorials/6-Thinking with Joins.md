1. Data points joined to existing elements produce the update selection. 
2. Leftover unbound data produce the enter selection, which represents missing elements. 
3. Any remaining unbound elements produce the exit selection, which represents elements to be removed.

**Thinking with joins means declaring a relationship between a selection (such as "circle") and data.**

Eg:
```
var circle = svg.selectAll("circle")
  .data(data);

circle.exit().remove();

circle.enter().append("circle")
    .attr("r", 2.5)
  .merge(circle)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
```