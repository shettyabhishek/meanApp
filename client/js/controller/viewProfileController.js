/**
	Filename : viewProfileController.js
	Author: Abhishek H S
	Handles the view for showing the user profile on load.
**/

meanApp.controller('viewProfileController',['$scope','$rootScope','$state','$window','businessServices','toaster','appConstants','$timeout',function($scope,$rootScope,$state,$window,businessServices,toaster,appConstants,$timeout){
	/** All variables for this controller **/
	$scope.profileObj = $rootScope.userProfileObj;
	$scope.postContent = "";
	$scope.submittedPost = false;
	$scope.hideCommentsObj = {};
	$scope.userComments = {};
	if(!$rootScope.userLoggedIn){
		$window.location = "/";
	}

	/** Handing the broadcast event for the user profile updates **/
	$rootScope.$on('updateProfileEvent', function(event, mass) {
		var keyUpdated = Object.keys(mass)[0];	
		switch(keyUpdated){
			case 'name': $rootScope.userProfileObj.name = mass[keyUpdated]; break;
			case 'gender': $rootScope.userProfileObj.gender = mass[keyUpdated]; break;
			case 'bio': $rootScope.userProfileObj.bio = mass[keyUpdated]; break;
			default: break;
		}
	});

	/** Getting the posts **/
	_getPosts(); //

	function _getPosts(){
		var getPstPrm = businessServices.getPosts();
		getPstPrm.then(function(resolve){
			$scope.allPosts = resolve;					
			$(".customScroll").mCustomScrollbar({
				axis:"y",
				theme:"dark",
				autoHideScrollbar: false,
				live: true,
				callbacks:{
				    onInit: function(){
				      	console.info('initialized')
			    	}
				}
			});
		},function(error){});
	}

	/** Submitting post **/
	$scope.submitPost = function(){
		var userPostObj = {
			userId: $rootScope.userProfileObj._id,
			name: $rootScope.userProfileObj.name,
			profileImage: $rootScope.userProfileObj.profileImage,
			postContent: $scope.postContent
		}
		var sbmtPstPrm = businessServices.submitPost(userPostObj);
		sbmtPstPrm.then(function(resolve){
			$scope.submittedPost = true;
			$scope.postContent = "";
			$timeout(function(){
				$scope.submittedPost = false;
				_getPosts(); //getting the posts back
			},1500)
		},function(reject){
			console.error(reject);
		});	
	}

	/** Handle activities to like a post **/
	$scope.likeThisPost = function(postUsrId,postId){
		var likePostObj = {
			postId: postId,
			userId: $rootScope.userProfileObj._id,
			userName: $rootScope.userProfileObj.name	
		}
		var likePostObjStr = JSON.stringify(likePostObj);
		if(postUsrId != likePostObj.userId){
			var pstLikePrm = businessServices.likePost(likePostObjStr);
			pstLikePrm.then(function(resolve) {
				if(resolve.status == 1)	{
					_getPosts();
				}
			},function(reject){});
		}
	}

	/** Function to show/hide comments section for a post **/
	$scope.showComments = function(indexToShow){
		if($scope.hideCommentsObj[indexToShow])
			$scope.hideCommentsObj[indexToShow] = false;
		else 
			$scope.hideCommentsObj[indexToShow] = true
	}

	/** Functon to add comments for a post **/
	$scope.addComments = function(postUsrId,postId,index){		
		var commentPostObj = {
			postId: postId,
			userId: $rootScope.userProfileObj._id,
			userName: $rootScope.userProfileObj.name,
			comment: $scope.userComments["cmnt"+index]
		}
		var commentPostObjStr = JSON.stringify(commentPostObj);
		var pstCmntPrm = businessServices.commentPost(commentPostObjStr);
		pstCmntPrm.then(function(resolve) {
			if(resolve.status == 1)	{
				$scope.userComments["cmnt"+index] = "";
				_getPosts();
			}
		},function(reject){});
	}
}]);	
