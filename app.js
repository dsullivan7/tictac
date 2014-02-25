var move = require('./lib/move');
var judge = require('./lib/judge');
var path = require('path');
var express = require('express');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
    res.render('index');
});

app.get('/move', function(req,res){
    var board = JSON.parse(req.query.board);
    var letter = req.query.letter;
    var nextMove = move.makeMove(board, letter);
    res.send(200, nextMove);
});

app.get('/judge', function(req, res){
    var board = JSON.parse(req.query.board);
    var winner = judge.judge(board);
    res.send(200, winner); 
});

app.listen(3000);
