var tictac = require('./lib/move');
var x = 'x';
var o = 'o';
var myArray = 
[
[null,o,o],
[o,null,o],
[x,x,x]
];

console.log(tictac.makeMove(myArray));
