//apiTest.js
const request = require('supertest');
const app = require('../app.js');
const db = require('../db/index.js');




//==================== user API test ====================

describe('POST /users', async () => {
    it('creates a new user', async () => {
        const data = { full_name: "test_username",password: "test_password", role: "A"};
        const api = await request(app);
        console.log(data);
        const { status, body } = await api.post(`/users`).send(data);
        console.log(status);
        console.log(body);
        status.should.equal(201);
        body.full_name.should.equal(data.full_name);
        body.password.should.equal(data.password);
        body.role.should.equal(data.role);
    
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

