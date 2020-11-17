if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const { assert } = require('chai');
var expect = require('chai').expect;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

describe('contact client test', function () {
    this.timeout(5000);

    it("send email", function (done) {
    
        const testEmail = {
            to: [process.env.EMAIL_TO],
            from: "pucket2020@gmail.com",
            subject: "Testing Code!",
            text: "Testing Message",
            mail_settings: {
                sandbox_mode: {
                    enable: true,
                },
            }
        }
        sgMail
            .send(testEmail)
            .then((info) => {
            expect(info[0].statusCode).to.equal(200);
            done();
            })
            .catch((err) => {
            expect(err).to.not.exist;
            done();
            })
    });
});