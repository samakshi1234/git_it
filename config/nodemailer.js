const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
   service:'gmail',
   host:'smtp.googlemail.com',
   port:587,
   secure:false,
   auth:{
       user:'samakshimalhotra24@gmail.com',
       pass:'lovesamloose'
   }
});


let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err);
        return;}

        mailHTML=template;
        }
    )


    console.log('hi');
        return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}