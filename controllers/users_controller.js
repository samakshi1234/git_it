//this is going to controll many users
module.exports.signUp=function(req,res){
    res.render('../views/users_sign_up.ejs',{
        title:"Sign Up"
        });
}

module.exports.signIn=function(req,res){
    res.render('../views/users_sign_in.ejs',{
        title:"SIGN IN"
    });
}

module.exports.create=function(req,res){
    res.render('',{

    });
}
module.exports.createSession=function(req,res){
    res.render('',{

    });
}

