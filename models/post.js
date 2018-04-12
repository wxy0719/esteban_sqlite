var mongoose=require('../config/db').mongoose;
var schema=new mongoose.Schema({
  user:'string',
  post:'string',
  updated:Date
});
var Post=mongoose.model('Post',schema);
module.exports=Post;