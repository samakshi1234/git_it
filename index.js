const express=require('express');
const port=8000;
const env=require('./config/environment');
const logger =require('morgan');
const app=express();
require('./config/view-helpers')(app);
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session= require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMilddleware=require('node-sass-middleware');
const flash= require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle= require('./config/passport-google-oath2-strategy');
const queue = require('./config/kue');
const chatServer =require('http').Server(app);
const io=require('socket.io')(chatServer);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is riunning on port 5000');

//setup the view engine
//mongo store is used to store the seession cookie in db
app.use(session({
    name:'codeial',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*1000)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
const path=require('path');

if(env.name == 'development'){
app.use(sassMilddleware({
    src:path.join(__dirname,env.asset_path,'/scss'),
    dest:path.join(__dirname,env.asset_path,'/css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
}
app.use(express.urlencoded({extended:false}));

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use(express.static(env.asset_path));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/uploads/users/post',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));
app.set('layout  extractStyles', true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
