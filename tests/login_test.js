var expect = require('chai').expect;
const app = require('../server.js');
const request = require('supertest');

before(done => {
    app.on("ready", () => {
        done();
    });
});

describe('login functionality', function () {

    it("try to register user", function (done) {
        request(app)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .send({username: "admin", password: "123"})
            .expect(200)
            .end(done);
    });

    it("login with registered user", function(done) {
        request(app)
            .post('/user/login')
            .set('Content-Type', 'application/json')
            .send({username: "admin", password: "123"})
            .expect(200)
            .end(done);
    });

    it("delete trial user", function(done) {
        request(app)
            .post('/user/delete')
            .set('Content-Type', 'application/json')
            .send({username: "admin"})
            .expect(200)
            .end(done);
    });
});