/**
var settings=require("./settings");
var mongoose=require('mongoose');
mongoose.connect("mongodb://"+settings.ip+"/"+settings.db);
var db=mongoose.connection;
module.exports={
  "dbCon":db,
  "mongoose":mongoose
};
*/
var sqlite3 = require('sqlite3');
var database;
var datebase_temp;
database = new sqlite3.Database("mydatebase.db", function(e){
 if (e) throw e;
});
//Ҳ����ʹ���ڴ��ͣ����ݲ������ñ���
datebase_temp = new sqlite3.Database(":memory:", function(e){
 if (e) throw e;
});
module.exports={
  "db":database,
  "dbTmp":datebase_temp
};
