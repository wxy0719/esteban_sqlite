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

//all�����ǲ�ѯ���У�����һ��list
exports.queryList = function(newUser,callback){
	var u=eval(newUser);
	var sql_="SELECT * FROM t_user t where 1=1 ";
	if(u!=null&&u.username!=null&&u.username!=''){
		sql_+=" and t.username= '"+u.username+"' ";
	}
  db.all(sql_, callback);
}

//each�Ǳ������������Զ�ÿ�����ݽ��в��������û��ֵ�򲻵��ûص�����
exports.queryListAndDoSomething = function(userName,doEach, done){
	//��ͨ��didOne�������ƣ�����һ�к��˳���
	//var didOne = false;
  db.each("SELECT * FROM t_user ", function(err, row){
      if (err){
          done(err, null);
      } else {
          doEach(null, row);
      }
  }, done);
}

//get�ǽ����ص�һ������
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

//run��ִ��sql�ķ�����֧��ռλ����exec�������ƣ�����ִ�ж���sql����֧��ռλ����
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

//serialize���У�parallelize���С���������ִ��˳��
