const d3 = require('d3');
/** d3-time-format
 * <https://github.com/d3/d3-time-format/blob/master/README.md#locale_parse>
*/
const today = new Date();
const formatedTime = d3.timeFormat("%B %d,%Y")(today);
console.log(formatedTime);//"March 13,2017"

const parsedTime = d3.timeParse("%B %d,%Y")("March 14,2017");
console.log(parsedTime);
console.log(today);