/** 
	File name: businessServices.js
**/

meanApp.factory('businessServices',['$http','appConstants','$q',function($http,appConstants,$q){

	/** All local variables **/
	var ifUserLoggedin = false;

	return{
		//Methods for Login & Edit Profile Module 
		login: _login,
		createUser: _createUser,
		setUserLoggedIn: _setUserLoggedIn,
		getUserLoggedIn: _getUserLoggedIn,
		updateUserSpecifics: _updateUserSpecifics,

		//Methods for Post Module 
		submitPost: _submitPost,
		getPosts: _getPosts,
		likePost: _likePost,
		commentPost: _commentPost
	}
	/** This method checks if the loggin in user is a valid user and reponds back **/
	function _login(userObj){
		var defferredPrm = $q.defer();
		$http({
			url:"/api/login",
			method: "post",
			data: userObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		})
		return defferredPrm.promise;
	}
	
	/** This method creates users and adds the user in the mongo db **/
	function _createUser(createUserObj){
		var defferredPrm = $q.defer();
		$http({
			url:"/api/createUser",
			method: "post",
			data: createUserObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;
	}

	/** This method saves the status if a user has logged into the site **/
	function _setUserLoggedIn(status){
		this.ifUserLoggedin = status;
	}

	/** This method gets the status of a user **/
	function _getUserLoggedIn(){
		return this.ifUserLoggedin;
	}

	/** This method updates the user gender **/
	function _updateUserSpecifics(updatedUserObj,parameter){
		var defferredPrm = $q.defer(), urlEndpoint = "";
		updatedUserObj.parameter = parameter;
		switch(parameter){
			case 'name': urlEndpoint = "/api/user/updateUserName"; break;
			case 'gender': urlEndpoint = "/api/user/updateUserGndr"; break;
			case 'bio': urlEndpoint = "/api/user/updateUserBio"; break;
			default: break;
		}
		$http({
			url: urlEndpoint,
			method: "post",
			data: updatedUserObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;	
	}

	/** This method is to submitting post **/
	function _submitPost(userPostObj){
		var defferredPrm = $q.defer();
		$http({
			url: "/api/user/submitPost",
			method: "post",
			data: userPostObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;
	}

	/** This method gets all posts **/
	function _getPosts(){
		var defferredPrm = $q.defer();
		$http({
			url: "/api/user/getPosts",
			method: "get"
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;	
	}

	/** This method adds likes for a post **/
	function _likePost(likePostObjStr){
		var defferredPrm = $q.defer();
		var likePostObj = JSON.parse(likePostObjStr);
		$http({
			url: "/api/user/likePosts",
			method: "post",
			data: likePostObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;
	}

	/** This method adds comments for the specific post **/
	function _commentPost(commentPostObjStr){
		var defferredPrm = $q.defer();
		var commentPostObj = JSON.parse(commentPostObjStr);
		$http({
			url: "/api/user/commentPosts",
			method: "post",
			data: commentPostObj
		}).success(function(data, status, headers, config){
			defferredPrm.resolve(data);
		}).error(function(data, status, headers, config){
			defferredPrm.reject("ERROR");
		});
		return defferredPrm.promise;
	}
}]);