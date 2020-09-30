const Post = require('../models/post');
const User = require('../models/users');
const Friendship = require("../models/friendship");


module.exports.home = async function(req, res){
    try{
       if (!req.user) {
         return res.redirect("/users/sign-in");
       }
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
        
      if(req.user){
        let users = await User.findById(req.user._id).populate('friendships');
        
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_friends: users.friendships
        });
      }
      else
      {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          message:"Login To See Friends"
        });
      }
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
module.exports.chat = async function (req, res) {
  try {
    let users = await User.findById(req.user._id);

    let friend = await Friendship.findOne({
      from_user: req.user._id,
      to_user: req.params.id,
    })
      .populate("to_user")
      .populate("from_user");

    if (friend == null) {
      friend = await Friendship.findOne({
        from_user: req.params.id,
        to_user: req.user._id,
      })
        .populate("to_user")
        .populate("from_user");
    }
    console.log("friend chat", friend);
    console.log("friend user chat", friend.from_user);

    let friendName = "";
    let fri = await User.findById(req.params.id);
    friendName = fri.name;

    if (req.xhr) {
      console.log("searching all users");
      return res.status(200).json({
        data: {
          friend: friend,
          myid: users.email,
          friendName: fri.name,
        },
        message: "setting up private chat",
      });
    }
  } catch (err) {
    console.log("error", err);
  }
};
