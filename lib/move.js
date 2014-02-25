var _ = require('underscore');
var judge = require('./judge');
var clone = require('clone');

module.exports.makeMove = makeMove;
module.exports.winningChance = winningChance;

var opposite = {
    'x':'o',
    'o':'x'
};

/*
 * @param xoArray the board to analyze
 *
 * @return the best move to make for turnLetter
 * */
function makeMove(xoArray, turnLetter){
    var possible = getPossible(xoArray);
    var max = {val:0, moves:[]}
    _.each(possible, function(move){
        var newboard = clone(xoArray);
        newboard[move[0]][move[1]] = turnLetter; 
        
        //find to probability of this board winning recursively
        var proba = winningChance(newboard, turnLetter, turnLetter);
        if(proba > max.val){
            max.val = proba;
            max.moves = [move];
        }else if(proba === max.val){
            max.moves.push(move);    
        }
    });

    return max.moves[Math.floor(Math.random()*max.moves.length)]
}

/**
 * @param xoArray the board to be analyzed
 *
 * @return an array of all possible moves
 * */
function getPossible(xoArray){
    var possible = [];
    _.each(xoArray, function(arr, i){
        _.each(arr,function(val, j){
            if(!val) possible.push([i,j]);
        });
    });
    return possible;
}

/**
 * @param xoArray the current board
 * @param myLetter the letter trying to win
 * @param turnLetter the letter currently moving
 * 
 * @return the probability that myLetter will win
 */
function winningChance(xoArray, myLetter, turnLetter){
    var result = judge.judge(xoArray);
    if(result){
        return result === myLetter;    
    }
    
    var totalWins = 0;
    var possible = getPossible(xoArray);
    _.each(possible, function(move){
        var newboard = clone(xoArray);
        newboard[move[0]][move[1]] = turnLetter;
        totalWins += winningChance(newboard, myLetter, opposite[myLetter]);
    });

    return ((totalWins * 1.0) / possible.length);
}
