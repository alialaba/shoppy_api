const nodemailer = require("nodemailer");
const nodemailerMailgun  = require('nodemailer-mailgun-transport');

const sendEmail =(options)=>{

  // /  This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: '1251ce711f4595e5cb444b52a14d3320-eb38c18d-1bb0451b',
    domain: 'sandbox948aeda8473b410c8af5972a3c3a8374.mailgun.org'
  }
}


const transporter = nodemailer.createTransport(nodemailerMailgun(auth));


const mailoptions ={
  from: process.env.EMAIL_FROM, // sender address
  to:   options.to , // list of receivers
  subject: options.subject, // Subject line
  html: options.text // html body
}

transporter.sendMail(mailoptions, (err, info) => {

  console.log(info)
  if (err) {
    console.log(`Error: ${err}`);
  }
  else {
    console.log(`Response: ${info}`);
  }
});


   /* const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      
      const mailoptions ={
        from: process.env.EMAIL_FROM, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        // text: "Hello world?", // plain text body
        html: options.text // html body
      }

      transporter.sendEmail(mailoptions, (err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }

      }) */

}

module.exports = sendEmail;