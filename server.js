/** 
	File name: server.js
	Author: Abhishek H S
	This script creates a server and connects to it, also sends a basic string response to the user / client
	The server creation requires the "http" module to be required.
**/

var httpMod = require('http'); //Core node js module
var pathMod = require('path'); //Core node js module
var mongooseMod = require('mongoose'); //Core node js module
var fileSys = require('fs');
var expsMod = require('express'); //Added as a npm plugin module
var bodyParser = require('body-parser'); //Added as a npm plugin module - for reading req parameters from req body.
var mulitpart = require('connect-multiparty');


/** Custom modules **/
var servadRndmCntrl = require('./server/controller/addRandom-controller');
var loginCntrl = require('./server/controller/login-controller');
var profileController = require('./server/controller/profile-controller');
var postsController = require('./server/controller/post-controller');

/** Establishing connection with the mongoose data base **/
mongooseMod.connect('mongodb://localhost:27017/mean-demo');

var app = expsMod();
console.log("****************************************");
console.log('Server start activities begins here.....');
console.log("****************************************");
app.use(expsMod.static(pathMod.join(__dirname,'lib'))); 
app.use(expsMod.static(pathMod.join(__dirname,'custom'))); 
app.use(expsMod.static(pathMod.join(__dirname,'client'))); 
app.use(bodyParser());
app.use(mulitpart());
app.set('case sensitive routing',false);

//REST APIs
app.get("/",function(req,res){
	//res.send("Hello, Express!");
	res.sendFile(__dirname+'/client/views/index.html');
});
app.post("/api/addRandCnt",servadRndmCntrl.create);
app.get("/api/addRandCnt",servadRndmCntrl.listing);

app.post("/api/login",loginCntrl.login);
app.post("/api/createUser",loginCntrl.createUser);
//For Profile update
app.post("/api/user/editPhoto",mulitpart(),profileController.updatePhoto);
app.post("/api/user/updateUserName",profileController.updateUserSpecifics);
app.post("/api/user/updateUserGndr",profileController.updateUserSpecifics);
app.post("/api/user/updateUserBio",profileController.updateUserSpecifics);
//For Posts 
app.post("/api/user/submitPost",postsController.submitPost);
app.get("/api/user/getPosts",postsController.getPosts);
app.post("/api/user/likePosts",postsController.likePosts);
app.post('/api/user/commentPosts',postsController.commentPosts)

app.listen(8001,function(){
	console.log("****************************************");
	console.log('server is up on port 8001');
	console.log("****************************************");
});
console.log("****************************************");
console.log('Server has started '+new Date());
console.log("****************************************");