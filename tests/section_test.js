// const { expect } = require('chai');
// const sinon = require('sinon');
// const request = require('supertest');
// var auth;
// var app;

// describe('manipulating sections functionality', function () {
//     before(function() {
//         auth = require('../middleware/auth.js');
//         sinon.stub(auth, 'auth')
//             .callsFake(function(req, res, next) {
//                 return next();
//         });
      
//         app = require('../server.js');
//     });

//     afterEach(function() {
//         // restore original method
//         auth.auth.restore();
//     });
    
//     it("adding a section", function (done) {
//         request(app)
//             .post('/admin/upload')
//             .set('Content-Type', 'application/json')
//             .set('x-auth-token', 'xyz123')
//             .send({section: "hobbies"})
//             .expect(200)
//             .end(done);
//     });
// });