/**
	File name: login-controller.js
	Author: Abhishek H S
	This file basically handles the controller activities for the server side. 
**/

/** requifing the models into the controller **/
var loginUserModel = require('../models/users');
var fileSys = require('fs');
var pathMananger = require('path');

module.exports.createUser = function(req,res){
	var modelObj = new loginUserModel(req.body);
	loginUserModel.find({emailId: req.body.emailId},function(err, success){
		if(success.length > 0){
			res.json({status: 0}); //status 0 means userid already exists
		} else {
			modelObj.save(function(err,success){
				res.json(success);
			});
		}
	});
}

module.exports.login = function(req,res){
	loginUserModel.find({emailId: req.body.email,pswd: req.body.password},function(err, success){
		/** When a valid user logs in, a folder for him gets created in the file system **/
		if(success.length > 0){
			res.json(success);
			var dir = pathMananger.join(__dirname,"../../client/uploads/"+success[0]._id);
			if (!fileSys.existsSync(dir)){
			    fileSys.mkdirSync(dir);
			}else {
				console.info('Folder for this user id already exists');
			}
		} else {
			res.json([]);
		}
	});
};

