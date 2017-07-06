/**
	File name: addRandom-controller.js
	Author: Abhishek H S
	This file basically handles the controller activities for the server side. 
**/

/** requifing the models into the controller **/
var adRndmModel = require('../models/addRandomModel');

module.exports.create = function(req,res){
	var modelObj = new adRndmModel(req.body);
	modelObj.save(function(err, success){
		res.json(success);
	});
}

module.exports.listing = function(req,res){
	adRndmModel.find({},function(err, success){
		res.json(success);
	});
}