/**
	File name: profile-controller.js
	Author: Abhishek H S
	This file basically handles the controller activities for the server side. 
**/

/** requiring the models into the controller **/
var userModel = require('../models/users');
var fileSys = require('fs');
var pathMananger = require('path');

module.exports.updatePhoto = function(req,res){
	var file = req.files.file;
	var userId = req.body.userId;
	var tempPath = file.path;
	var getTimeInSec = new Date().getTime(); 
	var targetPath = pathMananger.join(__dirname,"../../client/uploads/"+userId+"/"+getTimeInSec+file.name);
	var savePath = "/uploads/"+userId+"/"+getTimeInSec+file.name;

	fileSys.rename(tempPath, targetPath,function(err){
		if(err){
			res.json({status: 0});
		} else {
			userModel.findById(userId, function(err, userData){
				userData.profileImage = savePath;
				userData.save(function(err){
					if(err){
						res.json({status: 0});
					} else {
						res.json({status: 1});
					}
				});	
			});
		}
	});	
}

module.exports.updateUserSpecifics = function(req,res){
	userModel.findById(req.body.id, function(err, userData){
		switch(req.body.parameter){
			case 'name': userData.name = req.body.name; break;
			case 'gender': userData.gender = req.body.gender; break;
			case 'bio': userData.bio = req.body.bio; break;
			default: break;
		}		
		userData.save(function(err){
			if(err){
				res.json({status: 0});
			} else {
				res.json({status: 1});
			}
		});	
	});
}