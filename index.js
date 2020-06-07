const express=require('express');
const port=8000;

const app=express();
app.use(express.static('./assests'));
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session= require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
app.use(expressLayouts);

app.set('layout  extractStyles', true);
app.set('layout extractScripts',true);

app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'));
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*1000)
    }
}));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
