var tictac = require('./validator.js');
var x = 'x';
var o = 'o';
var myArray = 
[
[o,o,o],
[o,o,x],
[x,x,x]
]

console.log(tictac.validate(myArray));
