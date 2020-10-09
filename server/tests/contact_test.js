const { assert } = require('chai');
var expect = require('chai').expect;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

describe('contact client test', function () {

    it("send email", function (done) {
    
        const testEmail = {
            to: ["celivi8932@zik2zik.com"],
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