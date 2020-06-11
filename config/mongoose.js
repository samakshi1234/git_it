// const mongoose=require('mongoose');

// mongoose.connect('mongodb://localhost/codeial_development').then(() => {
// console.log("Connected to Database");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });
// const db= mongoose.connection;

// db.on('error',console.error.bind(console, 'error connecting to db'));

// db.once('open', function(){
//     console.log('succesfully connected to database');
// });

// module.exports=db;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;