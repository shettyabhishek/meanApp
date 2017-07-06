/** 
	File name: app.js
	Author: Abhishek H S
	This script has the specifics of angular related initialization configurations.
**/
var meanApp = angular.module('meanApp', ['ngResource','ui.router','toaster','ngFileUpload']);

/** App configruration defined below **/
meanApp.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('signUp',{
		url:'/signup',
		templateUrl: 'views/signup.html',
		controller:'signUpController'
	})
	.state('editProfile',{
		url:'/editProfile',
		templateUrl: 'views/editProfile.html',
		controller:'editProfileController'	
	})
	.state('viewProfile',{
		url:'/viewProfile',
		templateUrl: 'views/viewProfile.html',
		controller:'viewProfileController'	
	})
	
	$urlRouterProvider.otherwise("/");
});

/** Adding filters **/
meanApp.filter('formatDate',function(){
	return function(inpDate){
		var date = "",frmtDt = "";
		var monthName = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];		
		inpDate = (inpDate != undefined) ? new Date(inpDate.split(".")[0]) : "";
		if(inpDate != "")
			frmtDt =  inpDate.getDate()+" "+monthName[(inpDate.getMonth())] + ' ' +  inpDate.getFullYear();
		return frmtDt; 	
	}
})