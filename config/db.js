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
//也可以使用内存型，数据不会永久保存
datebase_temp = new sqlite3.Database(":memory:", function(e){
 if (e) throw e;
});
module.exports={
  "db":database,
  "dbTmp":datebase_temp
};
