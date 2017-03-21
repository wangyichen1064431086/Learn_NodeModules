/*jsdom */

/* INTRODUCTION
 * 基于WHATWG DOM和HTML标准的JavaScript实现，用于Node.js
 * <https://www.npmjs.com/package/jsdom>
*/

/** API
 * jsdom.env
 */
const jsdom = require("jsdom");

jsdom.env(
  '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
  ["http://code.jquery.com/jquery.js"],
  function(err,window) {
    console.log("contents of a.the-link:",window.$("a.the-link").text());
  }
);