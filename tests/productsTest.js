//apiTest.js
const request = require('supertest');
const app = require('../app.js');
const expect = require('chai').expect;
let lastProductId = 0;
//==================== product API test ====================

describe('POST /products', async (done) => {
    it('creates a new product', async () => {
        const data = { name: 'test_product', category: 'test_category', price: 10.00, num_in_stock: 100 };

        session = request.agent(app);

        session
            .post(`/products`)
            .send(data)
            //.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                console.log(res.body)
                expect(res.body.name).equal(data.name);
                expect(res.body.category).equal(data.catergory);
                expect(res.body.price).equal(data.price);
                expect(res.body.num_in_stock).equal(data.num_in_stock);
                //const productId = res.body.id;
                expect(res.status).equal(201);
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
                expect(res.body[0].name.any(String))
                expect(res.body[0].category.any(String))
                expect(res.body[0].id.any(Number))
                expect(res.body[0].price.any(Number))
                expect(res.body[0].num_in_stock.any(Number))
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
                expect(res.body[0].name.any(String))
                expect(res.body[0].category.any(String))
                expect(res.body[0].id.equals(productId))
                expect(res.body[0].price.any(Number))
                expect(res.body[0].num_in_stock.any(Number))
                done();
 
            });
 
    });
});

// PUT
describe('PUT /products', async (done) => {
    it('updates product', async () => {
        let data = { name: 'test_product', category: 'test_category', price: 10.00, num_in_stock: 101 };  

        session = request.agent(app);

        session
            .post(`/products/${data.id}`)
            .send(data)

            .expect(200, data);
            //check data

    
    })
    it('puts product back', async () => {
        //put back
        data = { name: 'test_product', category: 'test_category', price: 10.00, num_in_stock: 100 };


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
                lastProductId = res.body.length - 1;
                
        
            });
    }),
    it('deletes that product', async () => {
        sessionTwo = request.agent(app);
        sessionTwo
            .delete(`/products/${lastProductId}`)
            .expect(200)
            
        
        
    });
});