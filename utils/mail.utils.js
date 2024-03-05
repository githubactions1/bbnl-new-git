const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;





//console.log("mail utils")



// const ClientId = "778781446511-8gdeiopi2dcbsbd26spqrie133ck6pve.apps.googleusercontent.com";
// const ClientSecret = "EtCN4Ktwt2y4MugTjFi3vVJe";
// const RedirectionUrl = "https://developers.google.com/oauthplayground"


// function getOAuthClient() {
//   return new OAuth2(ClientId, ClientSecret, RedirectionUrl);
// }

// var oauth2Client = getOAuthClient();
// oauth2Client.setCredentials('1//04P-3fKuUK2HyCgYIARAAGAQSNwF-L9IrwBDIMNfNBnGkjDdCqWGP2c1SZSVxEasnK5TDi7KCx9wqutcCp8Myw3HGimx_Ac5KILU');
// // var accessToken = oauth2Client.getAccessToken()
// var accessToken = "ya29.Il-6B5bXqSsO0kCm1bGvsxNQApkHsjM99X5GQnLo85K5qy2qYz3ALALygrcQwHDrk359cCtIGFVtgx85Kf5P1qkNRDzFGcbC9QnfxHd1MYSaMgMTIbR32yQ2zrlvxz49iQ"


// var auth = {
//   type: 'OAuth2',
//   user: 'kodurisatyam@gmail.com',
//   clientId: '778781446511-8gdeiopi2dcbsbd26spqrie133ck6pve.apps.googleusercontent.com',
//   clientSecret: 'EtCN4Ktwt2y4MugTjFi3vVJe',
//   refresh_token: "1//04P-3fKuUK2HyCgYIARAAGAQSNwF-L9IrwBDIMNfNBnGkjDdCqWGP2c1SZSVxEasnK5TDi7KCx9wqutcCp8Myw3HGimx_Ac5KILU",
//   access_token: accessToken
// }
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: auth,
// });
// var info = {
//   from: 'kodurisatyam@gmail.com',
//   to: "machina.sravani@gmail.com",
//   subject: "Hello",
//   text: "Hello world?",
//   html: "<b>Hello world? test mail</b>"
// };
// transporter.sendMail(info, (err, res) => {
//   if (err) {
//     return console.log("error.....................", err);
//   } else {
//     console.log(JSON.stringify(res));
//   }
// });

exports.mailSend = function(body, callback){
  // console.log(body)
var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
      user: 'machina.sravani@gmail.com',
      pass: 'harivissu6090'
  }
});

var mailOptions = {
  from: 'machina.sravani@gmail.com',
  to: body.email,
  subject: "hello",
  text: 'Mathru Godavari!',
  html: body.html,
  attachments: [{  
    filename: body.invoice_id+body.invoice_to+'.pdf',
    path: body.pdf 
},]
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
      console.log('in error', error);
  } else {
      console.log('Email sent: ' + info.response,mailOptions.to,mailOptions.attachments[0].path);
      callback({},'Email sent: ' + info.response)
  }
});
}