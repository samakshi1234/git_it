const express=require('express');
const port=8000;
// const Sign = require('./models/users.js');
const app=express();
app.use(express.static('./assests'));
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(expressLayouts);

app.set('layout  extractStyles', true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
