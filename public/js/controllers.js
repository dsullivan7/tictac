function tictacController($scope, $http, $timeout, $sce){
    $scope.board = [['','',''],['','',''],['','','']];
    $scope.team = 'x';
    $scope.opponent = 'o';
    $scope.makingMove = false;
    $scope.gameOver = false;

    $scope.makeMove = function(move){

        if(!$scope.board[move[0]][move[1]] && !$scope.makingMove && !$scope.gameOver){
            $scope.makingMove = true;
            $scope.board[move[0]][move[1]] = $scope.team;
           
            judge(function(){$timeout(oppMove,1000)}); 
        }
    }
    
    var oppMove = function(){
        $http.get('/move?board='+JSON.stringify($scope.board)).  
            success(function(data){
                $scope.board[data[0]][data[1]] = $scope.opponent;
                $scope.makingMove = false;
                judge();
            })
    }

    var judge = function(compFunction){
        console.log(JSON.stringify($scope.board));
        $http.get('/judge?board='+JSON.stringify($scope.board)).
            success(function(data){
                if(data){
                    $scope.gameOver = true;
                    $scope.gameOverMessage = $sce.trustAsHtml(data);
                }else{
                    if(compFunction){
                        compFunction();
                    }
                }
            });
    }
}
