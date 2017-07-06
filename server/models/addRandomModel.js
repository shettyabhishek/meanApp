/**
	File name: addRandomModel.js
	Author: Abhishek H S
	This file basically handles the model to be formed for pushing the record into the 
	mongodb. The Model is created using a npm plugin 'mongoose'
**/

var mongooseMod = require('mongoose');
module.exports = mongooseMod.model('adRndm',{
	name: String
});