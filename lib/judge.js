var judge = function(xoArray){
    successIndices = getSuccessIndices(xoArray.length);
    return judgeWithIndices(xoArray, successIndices);
}

var judgeWithIndices = function(xoArray, successIndices){
    for(set in successIndices){
        var result = checkSet(xoArray, successIndices[set]);
        if(result) return result;
    }
    
    return null;
}

var checkSet = function(xoArray, set){
    var x = set[0][0];
    var y = set[0][1];
    var cur = xoArray[x][y];
    
    for(var i = 1; i < set.length; i++){
        var x = set[i][0];
        var y = set[i][1];
        if(cur !== xoArray[x][y]){
            return null;
        }
    }
    return cur;
 
}

var getSuccessIndices = function(dimension){
    var successIndices = [];
    var diag1 = [];
    var diag2 = [];

    for(var i = 0; i < dimension; i++){
        //add to the diagonal array
        diag1.push([i, i]);
        diag2.push([dimension - 1 - i, i]);
    
        var row = [];
        var col = [];
        for(var j = 0; j < dimension; j++){
            row.push([i,j]);
            col.push([j,i]);
        }

        //add this row and column to the list of indices
        successIndices.push(row);
        successIndices.push(col);
    }
    
    //add the diagonals to the list of indices
    successIndices.push(diag1);
    successIndices.push(diag2);
    
    return successIndices;
}

exports.judge = judge;
