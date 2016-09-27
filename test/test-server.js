var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app; // Can now make requests to app.
var storage = server.storage; // Can now investigate current state of storage object.

chai.use(chaiHttp); // Telling Chai to use chaiHttp

describe('Shopping List', function() {
    // argument function for test, will alway require one parameter: done.
    it('should list items on GET', function(done) {
        // Chai Http makes request to app.
        chai.request(app)
        // Make a GET Request to the endpoint /items.
            .get('/items')
        // When request is complete do the following code.
            .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].id.should.be.a('number');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
            done();
        });
    });
    it('should add an item on POST', function(done) {
        chai.request(app).post('/items').send({'name': 'Kale'}).end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.name.should.be.a('string');
            res.body.id.should.be.a('number');
            res.body.name.should.equal('Kale');
            // Once using Mongo no longer have 'storage'
            // chai.request(app).get(items)...end(function(err, resp){....done();})
            storage.items.should.be.a('array');
            storage.items.should.have.length(4);
            storage.items[3].should.be.a('object');
            storage.items[3].should.have.property('id');
            storage.items[3].should.have.property('name');
            storage.items[3].id.should.be.a('number');
            storage.items[3].name.should.be.a('string');
            storage.items[3].name.should.equal('Kale');
            done();
        });
    });
    it('should edit an item on PUT', function(done) {
      chai.request(app)
          .put('/items/:id/:name')
          .send()
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
    });
    it('should delete an item on DELETE', function(done) {
      chai.request(app)
          .delete('/items/1')
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            done();
          });
    });
    it('should add to an ID that exists on POST');
    it('should add without body data on POST');
    it('should add something other than valid JSON on PUT');
    it('should edit without an ID in the endpoint on PUT');
    it('should edit different ID in the endpoint than the body on PUT');
    it('should add to an ID that does not exist on PUT');
    it('should edit with something other than valid JSON on PUT');
    it('should edit without body data on PUT');
    it('should NOT delete ID that does not exist on DELETE');
    it('should NOT delete without an ID in the endpoint on DELETE');
    it('should return error when body not present POST', function(done) {
      chai.request(app).post('/items').end(function(err, res) {
        should.not.equal(err, null);
        res.should.have.status(400);
        done();
      });
    });

});
