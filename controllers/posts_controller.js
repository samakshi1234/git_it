const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const fs = require('fs');
const path = require('path');

module.exports.create = async function(req, res){
    //console.log(req.file);
      try {
        await Post.uploadedPic(req, res, async function (err) {
          try{
                // console.log('req: ',req);// are you sure req.file gives any file Y?? yes are you using multer for saving it ?yes
                console.log("upload file : " , req.file);
                console.log('req user : ',req.user );
                if (req.file)
                {
                    let post = await Post.create({
                    content: req.body.content,
                    user: req.user._id,
                    postpic: Post.postPath + '/' + req.file.filename
                    });
                
                    //console.log(post);
                
                // console.log(post.postpic);
                post = await post.populate("user", "name avatar").execPopulate();
                if (req.xhr) {
                    // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it
                    return res.status(200).json({
                    data: {
                        post: post,
                    },
                    message: "Post created!",
                    });
                }
            }
            else
            {
               
                let post = await Post.create({
                    content: req.body.content,
                    user: req.user._id
                }); 

                post = await post.populate("user", "name ").execPopulate();
                if (req.xhr) {
                    // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it
                    return res.status(200).json({
                    data: {
                        post: post,
                    },
                    message: "Post created!",
                    });
                }
            }
             console.log(post);
          }
        catch(err){
            req.flash('error',err);
            return;
        } 

            req.flash("success", "Post published!");
            return res.redirect("back");
        });
      } catch (err) {
        req.flash("error", err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect("back");
      }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.commnts}}); 
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}