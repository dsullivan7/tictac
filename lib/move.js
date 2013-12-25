var makeMove = function(xoArray){
    var possible = [];
    for(var i in xoArray){
        for(var j in xoArray[i]){
            if(xoArray[i][j] === null){
                possible.push([i,j]);
            }
        }
    }
    return possible[parseInt(Math.random()*possible.length)];
}

exports.makeMove = makeMove;
