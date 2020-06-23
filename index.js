const express=require('express');
const port=8000;
const app=express();
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
//setup the view engine
//mongo store is used to store the seession cookie in db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
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

app.use(sassMilddleware({
    src:'./assests/scss',
    dest:'./assests/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use(express.static('./assests'));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname + '/uploads'));

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
