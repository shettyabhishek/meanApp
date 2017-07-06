/***
	File Name: addRandomController.js
	Author: Abhishek H S

***/

meanApp.controller('addRandomController',['$scope','$resource',function($scope,$resource){
	/**
		$resource is an injection to handle restful service calls. Equivalent of models. 
		Knows to do all the restful operations, amount of code to be written is much 
		lesser.
	**/
	var addRandCntResource = $resource('/api/addRandCnt');

	$scope.userName = "Abhishek";
	$scope.randomContent = [];

	/** Initialization **/
	addRandCntResource.query(function(result){
		$scope.randomContent = result;		
	})	

	$scope.addRandomContent = function(){
		/*var obj = {
			id: $scope.randomContent.length + 1,
			name: $scope.contentText
		}
		$scope.randomContent.push(obj);*/
		var adRndCntResObj = new addRandCntResource();
		adRndCntResObj.name = $scope.contentText;
		adRndCntResObj.$save(function(result){
			$scope.randomContent.push(result);
			$scope.contentText = "";	
		});
	}
}]);