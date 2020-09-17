const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');

const POST_PATH=path.join('/uploads/users/post');

const postSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in this post schema itself
    comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
   ],
   likes: [
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:'Like'
       }
   ],
   postpic:{
       type:String
   }
},{ 
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',POST_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
   //static methods
   let maxSize = 10 * 1024 * 1024;
  postSchema.statics.uploadedPic= multer({storage:storage,limits:{fileSize: maxSize}}).single('postpic');
  postSchema.statics.postPath= POST_PATH;

const Post=mongoose.model('Post',postSchema);
module.exports=Post;