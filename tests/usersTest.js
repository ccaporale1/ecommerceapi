//apiTest.js
const request = require('supertest');
const app = require('../app.js');

console.log('Users Route Tests')

//==================== user API test ====================

describe('POST /users', async (done) => {
    it('creates a new user', async () => {
        const data = { full_name: "test_username",password: "test_password", role: "A"};

        session = request.agent(app);

        session
            .post(`/users`)
            .send(data)
            //.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                
                expect(res.body).toEqual(data);
                //const userId = res.body.id;
                expect(res.status).toEqual(201);
                done();
            })
        
        
        
    });
});
/**
 * Testing get all user endpoint
 */
describe('GET /users', async (done) => {
    it('respond with json containing a list of all users', async () => {
        session = request.agent(app);

        session
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', "application/json/")

            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(Array.isArray(res.body)).toBeTruthy()

                //check data
                expect(res.body[0].any(Object))
                expect(res.body[0].full_name.any(String))
                expect(res.body[0].role.any(String))
                expect(res.body[0].id.any(Number))
                done();
            });
    }),

    it('respond with the requested user data', async () => {
        const userId = 1;
        const userMatch = { id: userId, full_name: 'test_user', role: 'A', password: 'test_pw' };
        session = request.agent(app);

        session
            .get(`/users/${userId}`)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.status).toEqual(200)
                //check data
                expect(res.body[0].any(Object))
                expect(res.body[0].full_name.any(String))
                expect(res.body[0].role.any(String))
                expect(res.body[0].id.any(Number))
                done();
 
            });
 
    });
});

// PUT
describe('PUT /users', async (done) => {
    it('updates user', async () => {
        let data = { id: 1, full_name: "test_username_replaced",password: "test_password_replaced", role: "B"};

        session = request.agent(app);

        session
            .post(`/users/${data.id}`)
            .send(data)
            .expect(200, data)
    
    }),
    it('puts user back', async () => {
        //put back
        data = { id: 1, full_name: "test_username",password: "test_password", role: "A"};

        sessionTwo = request.agent(app);

        sessionTwo
            .post(`/users/${data.id}`)
            .send(data)
            .expect(200)
            //.expect('Content-Type', /json/)
        
    });
});
//delete
describe('DELETE /users', async (done) => {
    it('gets last user', async () => {

        session = request.agent(app);

        session
            .get(`/users`)
    
            //.expect('Content-Type', /json/)
            .then((res) => {
                lastUserId = res.body.length - 1;
                
        
            });
    }),
    it('deletes that user', async () => {
        sessionTwo = request.agent(app);
        sessionTwo
            .delete(`/users/${lastUserId}`)
            .expect(200)
            
        
        
    });
});