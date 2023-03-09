const nodeMailer=require('../config/nodemailer');

exports.newComment =(comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'learnniru@gmail.com',
        to: comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){console.log('Error in sending email',err);return;}
        console.log('Message Sent',info);
        return;
    }); 

}