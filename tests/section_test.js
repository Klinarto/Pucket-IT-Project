// const { expect } = require('chai');
// const sinon = require('sinon');
// const request = require('supertest');
// var auth = require('../middleware/auth.js');
// const authStub = sinon.stub(auth, "auth");
// var app = require('../server.js');

// describe('manipulating sections functionality', function () {
//     beforeEach(function() {
//         auth = require('../middleware/auth.js');
//         sinon.stub(auth, 'auth')
//             .callsFake(function(req, res, next) {
//                 return next();
//             });
      
//         app = require('../server.js');
//     });

//     afterEach(function() {
//         // restore original method
//         auth.auth.restore();
//     });
    
//     it("adding a section", function (done) {
//         auth.auth.callsFake((req, res, next) => next());
//         request(app)
//             .post('/admin/upload')
//             .send({})
//             .expect(200)
//             .end(done);
//     });
// });