const User=require('../models/users');
//this is going to controll many users
module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('userprofile', {
            title: 'User Profile',
            profile_user:user
        });
    });
  
}

module.exports.update=function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    res.render('../views/users_sign_up.ejs',{
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
            return res.redirect('back');
        }
    
        User.findOne({email: req.body.email}, function(err, user){
            if(err){console.log('error in finding user in signing up'); return}
    
            if (!user){
                User.create(req.body, function(err, user){
                    if(err){console.log('error in creating user while signing up'); return}
    
                    return res.redirect('/users/sign-in');
                })
            }else{
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
