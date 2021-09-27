let chai =require('chai');
let chaiHttp=require('chai-http');
const { response } = require('express');
let server=require('../index');


//asertion style
chai.should();

chai.use(chaiHttp);

describe(' products api', ()=>{
    /**
     * get products routes
     */
    describe('GET /user',()=>{
        it("it should GET all products",function(done){
            this.timeout(30000);
            chai.request(server)
            .get('/user')
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
        })
        it("it should NOT GET any products",function(done){
            this.timeout(50000);
            chai.request(server)
            .get('/users')
            .end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        })
        it("ADMIN ROUTE should GET all products", function (done) {
                 this.timeout(20000);
                 chai.request(server)
                .get('/admin')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                 });
        });
        /**Get product by ID */
        describe("GET /admin/:id",function(){
            it("ADMIN ROUTE should GET products by ID", function (done) {
                this.timeout(20000);
                const taskID = '61471ff278f44bd5c3dd05c4';
                chai.request(server)
                    .get('/admin/'+taskID)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        done();
                    });
            });
            it("ADMIN ROUTE should NOt GET products by invalid ID", function (done) {
                this.timeout(20000);
                const taskID = '61471ff278f44bd5c3dd05';
                chai.request(server)
                    .get('/admin/' + taskID)
                    .end((err, response) => {
                        response.should.have.status(400);
                        response.body.should.be.a('object');
                        done();
                    });
            });
        });
        /**POST a new product */
        describe("POST /admin", function () {
            it("ADMIN ROUTE should POST products", function (done) {
                const task={
                    "ProductName": "Boat EarPhones",
                    "ProductPrice": 1499,
                    "Category": "Boat",
                    "Productdescription": "Amazing sound quality",
                    "ProductImage": "http://www.simpleimageresizer.com/_uploads/photos/590cad63/4a9082ec-d2a5-49b5-9daa-58ee52ec5d12_370x210.png"

                }
                this.timeout(20000);
                chai.request(server)
                    .post('/admin')
                    .send(task)
                    .end((err, response) => {
                        response.should.have.status(201);
                        done();
                    });
            });
            it("ADMIN ROUTE should NOT POST products", function (done) {
                const task = {
                    "ProductName": "Boat EarPhones",
                    "Category": "Boat",
                    "Productdescription": "Amazing sound quality",
                    "ProductImage": "http://www.simpleimageresizer.com/_uploads/photos/590cad63/4a9082ec-d2a5-49b5-9daa-58ee52ec5d12_370x210.png"

                }
                this.timeout(20000);
                chai.request(server)
                    .post('/admins')
                    .send(task)
                    .end((err, response) => {
                        response.should.have.status(404);
                        done();
                    });
            });
        });
        /**PUT Products route*/
        describe("PUT /admin/:id", function () {
            it("ADMIN ROUTE should not UPDATE products", function (done) {
                const taskID ="6148cd453c9273720361ceff";
                const task = {
                    "ProductName": "Boat EarPhones",
                    "ProductPrice": 1799,
                    "Category": "Boat",
                    "Productdescription": "Amazing sound quality",
                    "ProductImage": "http://www.simpleimageresizer.com/_uploads/photos/590cad63/4a9082ec-d2a5-49b5-9daa-58ee52ec5d12_370x210.png"
                };
                this.timeout(20000);
                chai.request(server)
                    .post('/admin/'+taskID)
                    .send(task)
                    .end((err, response) => {
                        response.should.have.status(404);
                        done();
                    });
            });
        });
            /**DELETE A PRODUCT */
            describe("DELETE /admin/:id", function () {
                it("ADMIN ROUTE should not delete products", function (done) {
                    const taskID = "6148cd453c9273720361ceff";
                    this.timeout(20000);
                    chai.request(server)
                        .post('/admin/' + taskID)
                       
                        .end((err, response) => {
                            response.should.have.status(404);
                            done();
                        });
                });
            });

   

    })


})