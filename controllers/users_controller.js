const User=require('../models/users');

const fs=require('fs');
const path=require('path');
//this is going to controll many users
module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('userprofile', {
            title: 'User Profile',
            profile_user:user
        });
    });
  
}

module.exports.update= async function(req,res){
    
    if(req.user.id == req.params.id){       
        try{ 
            let user = await User.findById(req.params.id);
             User.uploadedAvatar(req,res,function(err){
                 if(err){
                     console.log('*****Multer error');
                 }
                 user.name =req.body.name;
                 user.email =req.body.email;

                 if(req.file){
                    
                    if(user.avatar){
                       fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    
                    //this is saving the path of the uploaded file into the avatar field in the user
                     user.avatar= User.avatarPath + '/' + req.file.filename;
                 }
                 user.save();
                 return res.redirect('back');
             });
        }catch(err){
            req.flash('Error',err);
            return res.redirect('back');
        }
    }
    else{
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }  
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('../views/users_sign_up.ejs',{
        title:"Sign Up"
        });
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    
    res.render('users_sign_in',{
        title:"SIGN IN"
    });
}


    module.exports.create = function(req, res){
        if (req.body.password != req.body.confirm_password){
            req.flash('error', 'Passwords do not match');
            return res.redirect('back');
        }
    
        User.findOne({email: req.body.email}, function(err, user){
            if(err){req.flash('error', err); return;}
    
            if (!user){
                User.create(req.body, function(err, user){
                    if(err){req.flash('err','error in creating user while signing up'); return}
    
                    return res.redirect('/users/sign-in');
                })
            }else{
                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('back');
            }
    
        });
    }
    


module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
}
