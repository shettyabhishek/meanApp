/**
	Filename : loginController.js
	Author: Abhishek H S
	Handles the user sign up
**/
meanApp.controller('loginController',['$scope','$rootScope','$state','businessServices','toaster','appConstants',function($scope,$rootScope,$state,businessServices,toaster,appConstants){
	
	/** scope & local variables **/
	$scope.usr = {};
	$rootScope.userLoggedIn = false;
	$rootScope.userProfileObj = {};

	$scope.validateLogin = function(){
		var loginPrm = businessServices.login($scope.usr);
		loginPrm.then(function(resolve){
			if(resolve.length == 0){
				toaster.pop('error', "Error", appConstants.noUserExists);			
				$scope.usr = {};
			} else {
				$rootScope.userLoggedIn = true;
				$rootScope.userProfileObj = resolve[0];
				$scope.usr.name = resolve[0].name;
				var userObj = {name: resolve[0].name}
				window.localStorage["appUser"] = JSON.stringify(userObj);
				$state.go('viewProfile');
			}			
		},function(reject){
			toaster.pop('error', "Error", appConstants.noUserExists);
			$scope.usr = {};
		});	
	}

	$scope.logOutFromApp = function(){
		window.localStorage.removeItem('appUser');
		$state.go('logout');
	}
}]);