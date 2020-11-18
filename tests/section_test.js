const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');

const express = require("express");
const app = express();

const httpMocks = require("node-mocks-http");
const mongodb = require("mongo-mock");
const admin = require("../controllers/admin_controller");

var auth;

describe('manipulating sections functionality', function () {    
    it("adding a section", function (done) {
        var MockClient = mongodb.MongoClient;
        MockClient.connect("mongodb://localhost:27017/", {}, function(err, client) {
            var req = httpMocks.createRequest({
                method: "POST",
                path: "/admin/upload",
                body: {
                    section: "academicExperience",
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
    });

    it("editing a section", function (done) {
        var MockClient = mongodb.MongoClient;
        MockClient.connect("mongodb://localhost:27017/", {}, function(err, client) {
            var req = httpMocks.createRequest({
                method: "POST",
                path: "/admin/upload",
                body: {
                    section: "academicExperience",
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
            
            admin.editEntry(req, res);
            expect(res.statusCode).to.equal(200);
            done();
        })
    });

    it("deleting a section", function (done) {
        var MockClient = mongodb.MongoClient;
        MockClient.connect("mongodb://localhost:27017/", {}, function(err, client) {
            var req = httpMocks.createRequest({
                method: "POST",
                path: "/admin/upload",
                body: {
                    section: "academicExperience",
                    _id: "5f9041aa313e99df10676cfa"
                }
            })
            req.app = app;
            app.db = client.db("MockDB");

            var id = new mongodb.ObjectID("5f9041aa313e99df10676cfa");
            app.db.collection("academicExperience").insertOne({
                _id: id,
                title: "Test Entry",
                startDate: "2020-08-03",
                endDate: "2020-11-19",
                description: "Sample Test Entry",
                alignment: "left"
            }).then((result) => {
                var res = httpMocks.createResponse();
            
                admin.deleteEntry(req, res);
                expect(res.statusCode).to.equal(200);
                done();
            });
        })
    });
});