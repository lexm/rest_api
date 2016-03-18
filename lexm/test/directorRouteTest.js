'use strict';

process.env.MONGO_URI = 'mongodb://localhost/director_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;

var Director = require(__dirname + '/../models').Director;

require(__dirname + '/../server');

describe('testing Director API', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a new director', function(done) {
    request('localhost:3000')
    .post('/directors')
    .send({"name": "Steven Soderbergh", "date_of_birth": "January 14, 1963"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Steven Soderbergh');
      expect(Date(res.body.date_of_birth)).to.eql(Date('January 14, 1963'));
      expect(res.body).to.have.property('_id');
      done();
    })
  });

  it('should be able to retrieve list of directors', function(done) {
    request('localhost:3000')
    .get('/directors')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();
    });
  });

});

describe('need to have existing director to test with', function(done) {


    beforeEach(function(done) {
      var testDirector = new Director({"name": "Alejandro González Iñárritu", "date_of_birth": "August 15, 1963"});
      testDirector.save(function(err, data) {
        if(err) throw err;
        this.testDirector = data;
        done();
      }.bind(this));
    });

    it('should have created director in forEach block', function(done) {
      expect(this.testDirector.name).to.eql('Alejandro González Iñárritu');
      expect(Date(this.testDirector.date_of_birth)).to.eql(Date('August 15, 1963'));
      expect(this.testDirector).to.have.property('_id');
      done();
    });


  it('should be able to update director', function(done) {
    done();
  })
  it('should be able to delete director', function(done) {
    done();
  })
});

// describe('testing /directors:id GET route', function(done) {
//
// });
//
// describe('testing /directors:id PUT route', function(done) {
//
// });
//
// describe('testing /directors:id DELETE route', function(done) {
//
// });