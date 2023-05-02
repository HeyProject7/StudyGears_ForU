var nodemailer = require('nodemailer');
const sendMail = async(token, toMail) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'musaleshubham7@gmail.com',
            pass: 'oyseihhrgbzxhtup'
        }
    });

    var mailOptions = {
        from: 'musaleshubham7@gmail.com',
        to: `${toMail}`,
        subject: 'StydyGears Access Token For Access',
        html: `<h1>Hey This Is Your Access Token <br><textarea cols="40" rows="8">${token}</textarea><br>Use This Token To Authorize Your Account </h1>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Email Not Sent");
        } else {
            console.log("Email Sent");
        }
    });
}
module.exports = sendMail;