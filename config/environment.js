const fs=require('fs');
const rfs= require('rotating-file-stream');
const path=require('path');

const logDirectory =path.join(__dirname,'../production_logs');
console.log('hi1111');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path:logDirectory
});

const development={
    name:'development',
    asset_path:'./assests',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.googlemail.com',
        port:587,
        secure:false,
        auth:{
            user:'aggarwalsamantha09@gmail.com',
            pass:'worldhello'
        }
    },
        google_client_id:"916954633676-cssesn0prd24r7kl46iap110c9n3nhpr.apps.googleusercontent.com",
        google_client_secret:"P6sapuRe20e6wYNBSHk97-ML",
        google_call_back_url:"http://localhost:8000/users/auth/google/callback",
        jwt_secret:'codeial',
        morgan:{
            mode :'dev',
            options:{stram:accessLogStream}
        }
};

const production = {
    name :'production',
    asset_path:process.env.Codeial_asset_path,
    session_cookie_key:process.env.Codeial_session_cookie_key,
    db:process.env.Codeial_db,
    smtp:{
        service:'gmail',
        host:'smtp.googlemail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.Codeial_gmail_username,
            pass:process.env.Codeial_gmail_password
        }
    },
        google_client_id:process.env.Codeial_google_client_id,
        google_client_secret:process.env.Codeial_google_client_secret,
        google_call_back_url:process.env.Codeial_google_callback_url,
        jwt_secret:process.env.Codeial_jwt_secret,
        morgan:{
            mode :'combined',
            options:{stream:accessLogStream}
        }
}

 console.log(process.env.Codeial_asset_path);
module.exports=eval(process.env.Codeial_enviornment)== undefined ? development :production;
