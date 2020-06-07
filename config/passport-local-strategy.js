const passport=require('passport');

const LocalStrategy =require('passport-local').Strategy;
const User=require('../models/users');

passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    //find a user and establish tthe identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user -->Passport');
            return done(err);
        }
        if(!user || user.password !=password){
            console.log('Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
    });    
}
));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(user,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user -->Passport');
            return done(err);
        }
        return done(null,user);
    });
});

module.exports=passport;