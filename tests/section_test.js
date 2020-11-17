const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');

const express = require("express");
const app = express();

const httpMocks = require("node-mocks-http");
const mongodb = require("mongo-mock");
const admin = require("../controllers/admin_controller");

var auth;
//var app;

describe('manipulating sections functionality', function () {
    // before(function() {
    //     auth = require('../middleware/auth.js');
    //     sinon.stub(auth, 'auth')
    //         .callsFake(function(req, res, next) {
    //             return next();
    //     });
      
    //     app = require('../server.js');
    // });

    // afterEach(function() {
    //     // restore original method
    //     auth.auth.restore();
    // });
    
    it("adding a section", function (done) {
        var MockClient = mongodb.MongoClient;
        MockClient.connect("mongodb://localhost:27017/", {}, function(err, client) {
            var req = httpMocks.createRequest({
                method: "POST",
                path: "/admin/upload",
                body: {
                    section: "academic",
                    title: "Test Entry",
                    description : "Sample Test Entry",
                    startDate: "2020-08-03",
                    endDate: "2020-11-19",
                    alignment: "left"
                }
            })
            req.app = app;
            app.db = client.db("MockDB");

            var res = httpMocks.createResponse();
            
            admin.addNewEntry(req, res);
            expect(res.statusCode).to.equal(200);
            done();
        })
        
        // request(app)
        //     .post('/admin/upload')
        //     .set('Content-Type', 'application/json')
        //     .set('x-auth-token', 'xyz123')
        //     .send({section: "hobbies"})
        //     .expect(200)
        //     .end(done);
    });
});