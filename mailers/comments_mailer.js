const nodeMailer=require('../config/nodemailer');
//this is another way of exporting method
exports.newCommment= (comment) => {
    console.log('inside newComment mailer',comment);

    nodeMailer.transporter.sendMail({
        from:'samakshimalhotra24@gmail.com',
        to:comment.user.email,
        subject:"new Comment Published!",
        html:'<h1>yup,your comment is now published!</h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}