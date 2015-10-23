var app = angular.module('CelebList', ['ngRoute'])


.config(function($routeProvider) {
    //this runs automatically when the main module is created
    $routeProvider
   .when('/',{
        templateUrl:'templates/main.html',
        controller: 'MainCtrl'
    })
   .when('/details/:celebID', {
        templateUrl: 'templates/details.html',
        controller: 'DetailsCtrl'
    })
   .otherwise({redirectTo: '/'});
})

.controller('MainCtrl', function($scope, $http, Celebs) {
  
    $scope.allCelebs;
    
    Celebs.getAll()
    .then(function(response){
       
       $scope.allCelebs = response.data;
        
    }, function(response){
            //error
        
    });
    
})

.controller('DetailsCtrl', function($scope, $routeParams, $http, Celebs) {
   
    $scope.celebID = $routeParams.celebID;
    $scope.person = {};
        
    Celebs.getOne($scope.celebID)
    .then(function(response){
        
        var myCelebs = response.data.myCelebs;
        myCelebs.forEach(function(i){
            
            if (i.id == $routeParams.celebID)
                $scope.person = i;
        });
    }, function(response){
            
    });
    
});