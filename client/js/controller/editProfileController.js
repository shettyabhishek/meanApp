/**
	Filename : editProfileController.js
	Author: Abhishek H S
	Handles the user profile editing
**/
meanApp.controller('editProfileController',['Upload','$scope','$rootScope','$state','$window','businessServices','toaster','appConstants',function(Upload,$scope,$rootScope,$state,$window,businessServices,toaster,appConstants){
	
	$scope.loggedInUser = $rootScope.userLoggedIn;
	if(!$scope.loggedInUser){
		$window.location = "/";
	}
	$scope.loggedInUserObj = {
		id: $rootScope.userProfileObj._id,
		name: $rootScope.userProfileObj.name,
		bio: $rootScope.userProfileObj.bio 
	}	

	/** For the directive - gender selector**/
	$scope.gender = [{id: 1,name: "Male"},{id: 2,name: "Female"}];
    $scope.selected_gender = ($rootScope.userProfileObj.gender == "M") ? 1 : 2;

	/** Watcher to check for an image change, whenever there is a image change there is a method call 
		that is triggered to upload the file.
	**/
	$scope.$watch(function(){
		return $scope.file;
	},function(){
		_upload($scope.file); //Creating a private funciton for image upload
	})

	/** Function to upload image **/
	function _upload(fileObj){
		if(fileObj){
			Upload.upload({
				url: '/api/user/editPhoto',
				method: 'POST',
				data: {userId: $rootScope.userProfileObj._id},
				file: fileObj
			}).progress(function(evt){
			}).success(function(data){
				if(data.status == 1)
					toaster.pop('success', "Success", appConstants.profileImageUpdated);
				else 
					toaster.pop('error', "Error", appConstants.profileImageUpdateFailed);
			}).error(function(error){});
		}
	}

	/** Function to update user name **/
	$scope.updateUserName = function(){
		var usrNmUpdtPrm = businessServices.updateUserSpecifics($scope.loggedInUserObj,'name');
		usrNmUpdtPrm.then(function(success){
			toaster.pop('success', "Success", appConstants.userNameUpdated);
			$rootScope.$broadcast('updateProfileEvent', {name: $scope.loggedInUserObj.name});
		},function(err){
			toaster.pop('error', "Error", appConstants.userNameUpdFail);
		});
	}

	/** Function to update user gender, adding a watcher for the scope property - selected_gender
		On change of this scope variable a method gets triggered that updates the gender 
		at the backend
	**/
	$scope.$watch(function(){
		return $scope.selected_gender;
	}, function(newVal,oldVal){
		if(newVal != oldVal)
			_updateUserGnder();
	});
	function _updateUserGnder(){
		var usrObj = {
			id: $scope.loggedInUserObj.id,
			gender: ($scope.selected_gender == 1) ? appConstants.gender[0] : appConstants.gender[1]
		}
		var usrGenderPrm = businessServices.updateUserSpecifics(usrObj,'gender');
		usrGenderPrm.then(function(success){
			toaster.pop('success', "Success", appConstants.userGndrUpdated);
			$rootScope.$broadcast('updateProfileEvent', {gender: usrObj.gender});
		},function(err){
			toaster.pop('error', "Error", appConstants.userGndrFailed);
		});
	}	

	/** Function to update user bio **/
	$scope.updateUserBio = function(){
		var usrObj = {
			id: $scope.loggedInUserObj.id,
			bio: $scope.loggedInUserObj.bio
		}
		var usrBioPrm = businessServices.updateUserSpecifics(usrObj,'bio');
		usrBioPrm.then(function(success){
			toaster.pop('success', "Success", appConstants.userBioUpdated);
			$rootScope.$broadcast('updateProfileEvent', {bio: usrObj.bio});
		},function(err){
			toaster.pop('error', "Error", appConstants.userBioFailed);
		});
	}

	$scope.doneEditng = function(){
		$state.go('viewProfile');
	}
}]);