var nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_key: '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'
    }
}

const mailer = nodemailer.createTransport(sendGridTransport(options));

var sendContactMe = function(req, res){
    var email = {
        to: ['nevige3649@maillei.net'],
        from: 'pucket2020@gmail.com',
        subject: 'E-Portfolio Contact',
        html: '<b>Awesome sauce</b>'
    };
    mailer.sendMail(email, function(err, res) {
        if (err) {
            console.log(err)
        }
        console.log(res);
    });
}

module.exports.sendContactMe = sendContactMe;