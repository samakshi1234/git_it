const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');


passport.use(new googleStrategy({
   clientID:"916954633676-cssesn0prd24r7kl46iap110c9n3nhpr.apps.googleusercontent.com",
   clientSecret:"P6sapuRe20e6wYNBSHk97-ML",
   callbackURL:"http://localhost:8000/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);

        if(user){
            //idf found,set this user as req.user
            return done(null,user);
        }else{
            //if not found,create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google strategy-passport',err);
                    return;
                }

                return done(null,user);
            });
        }
    })
}));

module.exports=passport;