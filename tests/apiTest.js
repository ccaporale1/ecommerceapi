//apiTest.js
const request = require('supertest');
const app = require('../app.js');
const db = require('../db/index.js');




//==================== user API test ====================

describe('POST /users', async (done) => {
    it('creates a new user', async () => {
        const data = { full_name: "test_username",password: "test_password", role: "A"};

        session = request.agent(app);

        session
            .post(`/users`)
            .send(data)
            .expect(201)
            //.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Array);
                res.body.should.have.property('_id');
                user_id = res.body._id;
                done();
            })
        
        
        
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

