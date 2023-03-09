const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'learnniru@gmail.com',
        pass: 'yimkydpvlbgkuypa' 
    }
});

let renderTemplate=(data ,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath), //relpath is where this function is called
        data,
        function(err,template){
          if(err){console.log('error in loading temlate');return}
          
          mailHTML=template;
        }
    )
    return mailHTML;
}
 

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}