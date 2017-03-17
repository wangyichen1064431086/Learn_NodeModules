const _ = require('lodash');

//_.map(collection, [iteratee=_.identity])
//<https://lodash.com/docs/4.17.4#map>
/**
* Creates an array of values by running each element in collection thru iteratee.
* The iteratee is invoked with three arguments:
(value, index|key, collection).
*/
/// Example:
function square(n) {
  return n * n;
}
 
console.log(_.map([4, 8], square));
// => [16, 64]
 
console.log(_.map({ 'a': 4, 'b': 8 }, square));
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
console.log(_.map(users, 'user'));
// => ['barney', 'fred']