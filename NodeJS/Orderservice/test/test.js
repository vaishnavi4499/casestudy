let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('../order');

//asertion style
chai.should();

chai.use(chaiHttp);

/**ORDER service */
describe('ORDER api',()=>{
    /**
     * get products route
     */
    describe('GET /orders', () => {
        it("it should GET all orders", function (done) {
            this.timeout(20000);
            chai.request(server)
                .get('/orders')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
        it("it should NOT GET any orders", function (done) {
            this.timeout(50000);
            chai.request(server)
                .get('/order')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
        
    });
})