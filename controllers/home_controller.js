const Post = require('../models/post');
const User = require('../models/users');



module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        })
        .populate('likes')
        .populate('comments');
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

module.exports.search = async function(req, res){
    console.log("hi");
    //console.log(req.xhr);
    try{
         let result = await User.find({
           name: { $regex: ".*" + req.body.searcheduser + ".*" },
         });
         console.log(result);
         if (req.xhr) {
           console.log("searching all users");
           return res.status(200).json({
             data: {
               result: result,
             },
             message: "searching of user completed",
           });
         }
         res.redirect("back");
         
    }
    catch{
         console.log("Error", err);
         return;
    }
}
// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
