var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var db=require('../config/db');
var User=require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.queryList(null,function(err,data){
		if(data === undefined || data.length == 0){
			data="";
			}
   	res.render('index',{
			title:'首页',
			ustr:data
		});
  })
});

function getTime(date){
  return date.getFullYear()+
  "-"+date.getMonth()+1+"-"+
  date.getDate()+" "+
  date.getHours()+":"+
  date.getMinutes();
}

router.get('/reg', isLogin);
//用户进入注册页面
router.get('/reg',function(req,res){
  res.render('reg',{title:"用户注册"});
});
router.post('/reg', isLogin);
//用户点击注册按钮
router.post('/reg',function(req,res){
  if(req.body['password']!= req.body['passwordconf']){
    req.session.error="两次密码不一致";
    return res.redirect('/reg');
  }
  var md5=crypto.createHash('md5');
  var password=md5.update(req.body.password).digest('base64');
  var newUser={username:req.body['username'], password:password};
  
  User.findUserByUserName(newUser,function(err,user){
    if(user){
      err="用户名已经存在";
    }
    if(err){
      req.session.error=err;
      return res.redirect('/reg');
    }
    User.save(newUser,function(err){
      if(err){
        req.session.error=err.message;
        return res.redirect('/reg');
      }
      User.findUserByUserName(newUser,function(err,user_){
      	req.session.user=user_;
      	req.session.success="注册成功";
      	res.redirect('/');
      	});
    });
  });
});

router.get('/login',isLogin);
router.get('/login',function(req,res){
	console.log("*********"+req.body['page_userName']);
  res.render('login',{
  	title:"用户登陆",
  	page_userName:req.body['page_userName']
  	});
});
router.post('/login',isLogin);
router.post('/login',function(req,res){
  var md5=crypto.createHash('md5');
  var password=md5.update(req.body.password).digest('base64');
  var newUser={username:req.body['username'], password:password};
  User.findUserByUserName(newUser,function(err,user){
    if (!user) {
      req.session.error="用户不存在";
      req.page_userName=req.body['username'];
      return res.redirect('/login');
    }
    if(user.password!=password){
      req.session.error="密码错误";
      req.page_userName=req.body['username'];
      return res.redirect('/login');
    }
    req.session.user=user;
    req.session.success="登录成功";
    res.redirect('/');
  });
});


router.get('/logout',function(req,res){
  req.session.user=null;
  res.redirect('/');
});


function isLogin(req,res,next){
  if(req.session.user){
    req.session.message="用户已登录";
    return res.redirect('/');
  }
  next();
}

module.exports = router;