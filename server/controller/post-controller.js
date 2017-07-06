/**
	File name: post-controller.js
	Author: Abhishek H S
	This file basically handles the post submit, view and so on. 
**/

/** requiring the models into the controller **/
var postModel = require('../models/posts');

module.exports.submitPost = function(req,res){
	var usrPostObj = new postModel(req.body);
	usrPostObj.save(function(err,success){
		res.json(success);
	});
}

module.exports.getPosts = function(req,res){
	postModel.find({}).sort({data: -1}).exec(function(err, allPosts){
		res.json(allPosts);
	});
}

module.exports.likePosts = function(req,res){	
	postModel.find({_id:req.body.postId, likes:{$elemMatch:{userId: req.body.userId}}},function(err,success){
		if(success.length == 0){
			postModel.findById(req.body.postId,function(err,postItem){
				postItem.likes.push(req.body);
				postItem.save(function(err){
					if(err){
						res.json({status: 0});
					} else {
						res.json({status: 1});
					}
				});
			});
		}else{
			res.json({status: 0});
		}
	})		
}	

module.exports.commentPosts = function(req,res){
	postModel.findById(req.body.postId,function(err, postData){
		postData.comments.push(req.body);
		postData.save(function(err){
			if(err){
				res.json({status: 0});
			} else {
				res.json({status: 1});
			}
		});
	});
}