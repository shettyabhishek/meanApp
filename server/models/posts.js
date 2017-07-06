/**
	File name: post.js
	Author: Abhishek H S
	This file basically handles the model to be formed for pushing the post(s) into the 
	mongodb. The Model is created using a npm plugin 'mongoose'
**/

var mongooseMod = require('mongoose');
module.exports = mongooseMod.model('Post',{
	userId: String,
	name: String,
	profileImage: String,
	postContent: String, 
	postDate: {type: Date,default: Date.now},
	likes: {type: Array, default: []},
	comments: {type: Array,default: []}
});