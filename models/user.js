/**
var mongoose=require('../config/db').mongoose;
var schema=new mongoose.Schema({
  name:'string',
  password:'string'
});
var User=mongoose.model('User',schema);
module.exports=User;
*/

var db=require('../config/db').db;

//all方法是查询所有，返回一个list
exports.queryList = function(newUser,callback){
	var u=eval(newUser);
	var sql_="SELECT * FROM t_user t where 1=1 ";
	if(u!=null&&u.username!=null&&u.username!=''){
		sql_+=" and t.username= '"+u.username+"' ";
	}
  db.all(sql_, callback);
}

//each是遍历方法，可以对每行数据进行操作，如果没有值则不调用回调函数
exports.queryListAndDoSomething = function(userName,doEach, done){
	//可通过didOne参数控制，操作一行后退出、
	//var didOne = false;
  db.each("SELECT * FROM t_user ", function(err, row){
      if (err){
          done(err, null);
      } else {
          doEach(null, row);
      }
  }, done);
}

//get是仅返回第一条数据
exports.findUserByUserName=function(newUser,callback){
	var u=eval(newUser);
  db.get("SELECT * FROM t_user WHERE username = ?",
      [u.username],
      function(err, row){
          if (err){
          		console.log(err);
              callback(err, null);
          } else {
              callback(null, row);
          }
      });
};

//run是执行sql的方法，支持占位符。exec功能类似，可以执行多条sql，不支持占位符。
exports.save = function(newUser,callback){
	var u=eval(newUser);
  db.run("INSERT INTO t_user (id, username, password) VALUES (null, ?, ?);",
      [u.username,u.password],
      function(err){
          if (err){
          		console.log(err);
              callback(err);
          } else {
              callback(null);
          }
      });
}

//serialize串行，parallelize并行。用于区分执行顺序
