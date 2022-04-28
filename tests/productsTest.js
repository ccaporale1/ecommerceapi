//apiTest.js
const request = require('supertest');
const app = require('../app.js');

console.log('Products Route Tests')

//==================== product API test ====================

describe('POST /products', async (done) => {
    it('creates a new product', async () => {
        const data = { };

        session = request.agent(app);

        session
            .post(`/products`)
            .send(data)
            //.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                
                expect(res.body).toEqual(data);
                //const productId = res.body.id;
                expect(res.status).toEqual(201);
                done();
            })
        
        
        
    });
});
/**
 * Testing get all product endpoint
 */
describe('GET /products', async (done) => {
    it('respond with json containing a list of all products', async () => {
        session = request.agent(app);

        session
            .get('/products')
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

    it('respond with the requested product data', async () => {
        const productId = 1;
        const productMatch = {  };
        session = request.agent(app);

        session
            .get(`/products/${productId}`)
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
describe('PUT /products', async (done) => {
    it('updates product', async () => {
        let data = { };

        session = request.agent(app);

        session
            .post(`/products/${data.id}`)
            .send(data)
            .expect(200, data)
    
    }),
    it('puts product back', async () => {
        //put back
        data = { };

        sessionTwo = request.agent(app);

        sessionTwo
            .post(`/products/${data.id}`)
            .send(data)
            .expect(200)
            //.expect('Content-Type', /json/)
        
    });
});
//delete
describe('DELETE /products', async (done) => {
    it('gets last product', async () => {

        session = request.agent(app);

        session
            .get(`/products`)
    
            //.expect('Content-Type', /json/)
            .then((res) => {
                lastproductId = res.body.length - 1;
                
        
            });
    }),
    it('deletes that product', async () => {
        sessionTwo = request.agent(app);
        sessionTwo
            .delete(`/products/${lastproductId}`)
            .expect(200)
            
        
        
    });
});