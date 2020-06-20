const nodemailer=require('nodemailer');


let transporter=nodemailer.createTransport({
   service:'gmail',
   host:'smtp.gmail.com',
   port:587,
   secure:false,
   auth:{
       user:'aggarwalsamantha09@gmail.com',
       pass:'worldhello'
   }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template');
        return;}

        mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate

}