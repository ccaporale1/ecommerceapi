//apiTest.js
const request = require('supertest');
const app = require('../app.js');
const db = require('../db/index.js');

const agent = request.agent(app);


//==================== user API test ====================

describe('POST /users', function () {
    it('inserts a user into the database', function(done) {
        request(app)
            .post('/users')
            .send({ username: "test_username",password: "test_password", role: "A"})
            .set('Accept', 'application/json')
            .expect(201, done);
    });
});
/**
 * Testing get all user endpoint
 */
 describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', "application/json/")
            .expect(200, done);
    });
});