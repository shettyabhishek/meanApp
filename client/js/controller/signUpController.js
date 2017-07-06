/**
	Filename : signUpController.js
	Author: Abhishek H S
	Handles the user sign up
**/
meanApp.controller('signUpController',['$scope','$rootScope','$state','businessServices','toaster','appConstants',function($scope,$rootScope,$state,businessServices,toaster,appConstants){
	/** controller variables **/	
	var userObj = {
		emailId: "",
		pswd: "",
		gender: "",
		name: "",
		profileImage: ""
	};
	var myCopy = JSON.stringify(userObj);
	$scope.newUser = userObj;
	$scope.enableCreateUser = true;

	$scope.$watchGroup(['newUser.emailId','newUser.pswd'], function (newValue, oldValue) {
		$scope.enableCreateUser = ($scope.newUser.emailId != "" && $scope.newUser.pswd != "") ? false : true;
	});

	/** Function to create a new user **/
	$scope.createUser = function(){
		var createUserPrm = businessServices.createUser($scope.newUser);
		createUserPrm.then(function(resolve){
			if(resolve.status != undefined){
				if(resolve.status == 0)
					toaster.pop('warning', "Error", appConstants.userAlreadyExists);		
			} else {
				toaster.pop('success', "Success", appConstants.userCreatedSuccess);
			}
			$scope.newUser = JSON.parse(myCopy);
		},function(reject){
			console.error(reject);
		});	
	}
}]);