const app = require('../server.js');
const request = require('supertest');
const chaiJsonPattern = require('chai-json-pattern').default;
const chai = require('chai');
const { ObjectId } = require('mongodb');
var expect = chai.expect;
chai.use(chaiJsonPattern);

describe('test getting information from database', function () {
    const motto = `
    {
        "_id": Integer,
        "title": String,
        "description": String,
        "image": String
    }
    `;

    const card = `
    {
        "_id": Integer,
        "title": String,
        "description": String,
    }
    `;

    it("Get /", function (done) {
        request(app)
            .get('/api')
            .expect(200)
            .end( function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
                expect(res.body[0]).to.matchPattern(motto);
                expect(res.body[1]).to.matchPattern(card);
                done();
            });
    });

    it("Get /about-me", function (done) {
        request(app)
            .get('/api/about-me')
            .expect(200)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(1);
                expect(ObjectId.isValid(res.body[0]["_id"])).to.be.true;
                expect(res.body[0]["title"]).to.be.a('string');
                expect(res.body[0]["description"]).to.be.a('string');
                done();
            });
    });


    it("Get /academic-experiences", function (done) {
        request(app)
            .get('/api/academic-experiences')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                for (i=0; i<res.body.length; i++) {
                    expect(ObjectId.isValid(res.body[i]["_id"])).to.be.true;
                    expect(res.body[i]["title"]).to.be.a('string');
                    expect(Date.parse(res.body[i]["startDate"])).not.to.be.NaN;
                    expect(res.body[i]["description"]).to.be.a('string');
                    expect(res.body[i]["image"]).to.be.a('string');
                    expect(res.body[i]["alignment"]).to.be.oneOf(["Left", "Right"]);
                }
                done();
            });
    });

    it("Get /hobbies", function (done) {
        request(app)
            .get('/api/hobbies')
            .expect(200)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                for (i=0; i<res.body.length; i++) {
                    expect(ObjectId.isValid(res.body[i]["_id"])).to.be.true;
                    expect(res.body[i]["title"]).to.be.a('string');
                    expect(res.body[i]["description"]).to.be.a('string');
                    expect(res.body[i]["image"]).to.be.a('string');
                    expect(res.body[i]["alignment"]).to.be.oneOf(["Left", "Right"]);
                }
                done();
            });
    });
});